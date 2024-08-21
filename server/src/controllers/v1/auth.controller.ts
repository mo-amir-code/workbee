import { CLIENT_ORIGIN, sendEmailOTP } from "../../config/index.js";
import { apiHandler, ErrorHandlerClass, ok } from "../..//middlewares/index.js";
import { loginValidator, registerValidator } from "../../vaildators/index.js";
import {
  createUser,
  getAuth,
  getUser,
  updateAuth,
  updateUser,
} from "src/db/services/index.js";
import {
    ACCESS_TOKEN_NAME,
  accessCookieOptions,
  OTP_EXPIRY_IN_MINUTES,
  OTP_SENT_MESSAGE,
  OTP_TOKEN_NAME,
  otpTokenCookieOptions,
  PASSWORD_INCORRECT,
  USER_ALREADY_EXIST,
  USER_LOGIN_MESSAGE,
  USER_NOT_EXIST,
  USER_REGISTRATION_EMAIL_SUBJECT,
  USER_REGISTRATION_MESSAGE,
  USERNAME_ALREADY_EXIST,
} from "src/constants/index.js";
import {
  generateHashCode,
  generateOTP,
  generateOTPToken,
  generateRefreshAndAccessToken,
  isPasswordCorrect,
} from "src/utils/controllers/index.js";
import {
  createEmailTemplate,
  isUserValidWithEmailAndUsername,
} from "src/services/index.js";
import { SendEmailOTPType } from "src/types/config.js";
import { UserTableType } from "src/types/db-services/index.js";

const registerUser = apiHandler(async (req, res, next) => {
  const data = await registerValidator.validateAsync(req.body);
  const { password } = data;

  const { isUserExist, isUserVerified, isUsernameValid, userId } =
    await isUserValidWithEmailAndUsername(data);

  if (!isUsernameValid) {
    return next(new ErrorHandlerClass(USERNAME_ALREADY_EXIST, 409));
  }

  if (isUserExist && isUserVerified) {
    return next(new ErrorHandlerClass(USER_ALREADY_EXIST, 409));
  }

  if (isUserExist) {
    const updatedUser = await updateUser({ ...data, id: userId });
    req.user = updatedUser;
    return next();
  }

  const hashedPassword = await generateHashCode(password);

  const newUser = await createUser({ ...data, password: hashedPassword });

  req.user = newUser;
  return next();
});

const sendOTP = apiHandler(async (req, res) => {
  const userAuth = await getAuth({ user: req.user.id });

  const otp: number = generateOTP();
  const otpToken: string = await generateOTPToken({
    authId: userAuth.id,
    userId: userAuth.user,
  });

  const mailOption: SendEmailOTPType = {
    to: [req.user.email],
    subject: USER_REGISTRATION_EMAIL_SUBJECT,
    html: createEmailTemplate({
      otp,
      expireTime: OTP_EXPIRY_IN_MINUTES,
      message: USER_REGISTRATION_MESSAGE,
      name: (req.user as UserTableType).name,
      link: `${CLIENT_ORIGIN}/auth/verify?token=${otpToken}`,
    }),
  };

  await sendEmailOTP(mailOption);

  const otpHash: string = await generateHashCode(otp.toString());

  await updateAuth({ user: userAuth.user, otp: otpHash, otpToken });

  res.cookie(OTP_TOKEN_NAME, otpToken, otpTokenCookieOptions);

  return ok({
    res,
    message: OTP_SENT_MESSAGE,
  });
});

const loginUser = apiHandler(async (req, res, next) => {
  const { email, password } = await loginValidator.validateAsync(req.body);

  const user = await getUser({ email });

  if (!user) {
    return next(new ErrorHandlerClass(USER_NOT_EXIST, 401));
  }

  const userAuth = await getAuth({ user: user.id });

  if (!userAuth.verified) {
    return next(new ErrorHandlerClass(USER_NOT_EXIST, 401));
  }

  const passwordStatus = await isPasswordCorrect({plainPassword:password, hashedPassword:user.password});

  if(!passwordStatus){
    return next(new ErrorHandlerClass(PASSWORD_INCORRECT, 400));
  }

  const { accessToken, refreshToken } = await generateRefreshAndAccessToken({authId: userAuth.id, userId: user.id});

  res
  .cookie(ACCESS_TOKEN_NAME, accessToken, accessCookieOptions);

  await updateAuth({user: user.id, refreshToken});

  return ok({
    res,
    message: USER_LOGIN_MESSAGE
  });
});

export { registerUser, loginUser, sendOTP };
