import { CLIENT_ORIGIN, sendEmailOTP } from "../../config/index.js";
import { apiHandler, ErrorHandlerClass, ok } from "../..//middlewares/index.js";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  verifyOTPValidator,
} from "../../vaildators/index.js";
import {
  createAuth,
  createUser,
  getAuth,
  getUser,
  updateAuth,
  updateUser,
} from "../../db/services/index.js";
import {
  ACCESS_TOKEN_NAME,
  accessCookieOptions,
  ERROR_HAPPENED,
  FORGOT_PASSWORD_REQUEST_MESSAGE,
  FORGOT_PASSWORD_REQUEST_SUBJECT,
  INCORRECT_OTP,
  OTP_EXPIRED,
  OTP_EXPIRY_IN_MINUTES,
  OTP_SENT_MESSAGE,
  OTP_TOKEN_NAME,
  otpTokenCookieOptions,
  PASSWORD_INCORRECT,
  PASSWORD_RESET,
  USER_ALREADY_EXIST,
  USER_LOGIN_MESSAGE,
  USER_NOT_EXIST,
  USER_REGISTRATION_EMAIL_SUBJECT,
  USER_REGISTRATION_MESSAGE,
  USER_VERIFIED,
  USERNAME_ALREADY_EXIST,
} from "../../constants/index.js";
import {
  generateHashCode,
  generateOTP,
  generateOTPToken,
  generateRefreshAndAccessToken,
  isBcryptHashCorrect,
  JWTTokenVerifier,
} from "../../utils/controllers/index.js";
import {
  createEmailTemplate,
  isUserValidWithEmailAndUsername,
} from "../../services/index.js";
import { SendEmailOTPType } from "../../types/config.js";
import { UserTableType } from "../../types/db-services/index.js";

const registerUser = apiHandler(async (req, res, next) => {
  const data = await registerValidator.validateAsync(req.body);
  const { password } = data;

  const { isUserExist, isUserVerified, isUsernameValid, userId } =
    await isUserValidWithEmailAndUsername(data);

  if (isUserExist && isUserVerified) {
    return next(new ErrorHandlerClass(USER_ALREADY_EXIST, 409));
  }

  if (!isUsernameValid && isUserExist) {
    return next(new ErrorHandlerClass(USERNAME_ALREADY_EXIST, 409));
  }

  if (isUserExist) {
    const updatedUser = await updateUser({ ...data, id: userId });
    req.user = updatedUser;
    return next();
  }

  const hashedPassword = await generateHashCode(password);

  const newUser = await createUser({ ...data, password: hashedPassword });
  await createAuth({ user: newUser.id });

  req.user = newUser;
  return next();
});

const sendOTP = apiHandler(async (req, res) => {
  console.log("User: ", req.user);
  const userAuth = await getAuth({ user: req.user.id });
  console.log("User AUth: ", userAuth);

  const otp: number = generateOTP();
  const otpToken: string = await generateOTPToken({
    authId: userAuth.id,
    userId: userAuth.user,
  });

  let mailOption: SendEmailOTPType;

  switch (req.from) {
    case "forgot-password":
      mailOption = {
        to: [req.user.email],
        subject: FORGOT_PASSWORD_REQUEST_SUBJECT,
        html: createEmailTemplate({
          otp,
          expireTime: OTP_EXPIRY_IN_MINUTES,
          message: FORGOT_PASSWORD_REQUEST_MESSAGE,
          name: (req.user as UserTableType).name,
          link: `${CLIENT_ORIGIN}/auth/verify?token=${otpToken}`,
        }),
      };
      break;
    default:
      mailOption = {
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
  }

  await sendEmailOTP(mailOption);

  const otpHash: string = await generateHashCode(otp.toString());

  await updateAuth({ user: userAuth.user, otp: otpHash, otpToken });

  res.cookie(OTP_TOKEN_NAME, otpToken, otpTokenCookieOptions);

  return ok({
    res,
    message: OTP_SENT_MESSAGE,
  });
});

const verifyOTP = apiHandler(async (req, res, next) => {
  const { otp, otptoken } = await verifyOTPValidator.validateAsync({
    ...req.body,
    otptoken: req.cookies.otptoken,
  });

  const payload = JWTTokenVerifier(otptoken);

  if (!payload) {
    return next(new ErrorHandlerClass(OTP_EXPIRED, 400));
  }

  const userAuth = await getAuth({ user: payload.userId });

  const isOTPCorrect = await isBcryptHashCorrect({
    plainText: otp,
    hashedText: userAuth.otp as string,
  });

  if (!isOTPCorrect) {
    return next(new ErrorHandlerClass(INCORRECT_OTP, 400));
  }

  await updateAuth({
    user: userAuth.user,
    otp: null,
    otpToken: null,
    verified: true,
  });

  return ok({
    res,
    message: USER_VERIFIED,
  });
});

const loginUser = apiHandler(async (req, res, next) => {
  const { email, username, password } = await loginValidator.validateAsync(
    req.body
  );

  const user = await getUser(email ? { email } : { username });

  if (!user) {
    return next(new ErrorHandlerClass(USER_NOT_EXIST, 401));
  }

  const userAuth = await getAuth({ user: user.id });

  if (!userAuth.verified) {
    return next(new ErrorHandlerClass(USER_NOT_EXIST, 401));
  }

  const passwordStatus = await isBcryptHashCorrect({
    plainText: password,
    hashedText: user.password,
  });

  if (!passwordStatus) {
    return next(new ErrorHandlerClass(PASSWORD_INCORRECT, 400));
  }

  const { accessToken, refreshToken } = await generateRefreshAndAccessToken({
    authId: userAuth.id,
    userId: user.id,
  });

  res.cookie(ACCESS_TOKEN_NAME, accessToken, accessCookieOptions);

  await updateAuth({ user: user.id, refreshToken });

  return ok({
    res,
    message: USER_LOGIN_MESSAGE,
  });
});

const forgotPassword = apiHandler(async (req, res, next) => {
  const { email, username } = await forgotPasswordValidator.validateAsync(
    req.body
  );

  const user = await getUser(email ? { email } : { username });

  if (!user) {
    return next(new ErrorHandlerClass(USER_NOT_EXIST, 400));
  }

  req.user = user;
  req.from = "forgot-password";
  next();
});

const resetPassword = apiHandler(async (req, res, next) => {
  const { otp, otptoken, newPassword } =
    await resetPasswordValidator.validateAsync({
      ...req.body,
      otptoken: req.body.otptoken || req.cookies.otptoken,
    });

  const jwtPayload = JWTTokenVerifier(otptoken);

  if (!jwtPayload) {
    return next(new ErrorHandlerClass(OTP_EXPIRED, 401));
  }

  const userAuth = await getAuth({ user: jwtPayload.userId });

  if (!userAuth) {
    return next(new ErrorHandlerClass(ERROR_HAPPENED, 400));
  }

  const isOTPCorrect = await isBcryptHashCorrect({
    plainText: otp,
    hashedText: userAuth.otp as string,
  });

  if (!isOTPCorrect) {
    return next(new ErrorHandlerClass(INCORRECT_OTP, 400));
  }

  const hashedPassword = await generateHashCode(newPassword);

  await updateUser({ id: userAuth.user, password: hashedPassword });
  await updateAuth({ user: userAuth.user, otp: null, otpToken: null });

  return ok({
    res,
    message: PASSWORD_RESET,
  });
});

export {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
};
