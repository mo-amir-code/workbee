const REMOVE_USER_SAVED_TASK = "Saved Task Not Exist";

// Auth Controller
const USER_ALREADY_EXIST = "User Already Exist";
const USERNAME_ALREADY_EXIST = "Username Already Exist";
const USER_CREATED = "Registered";
const OTP_EXPIRY_IN_MINUTES = 15;
const USER_REGISTRATION_MESSAGE =
  "Your One-Time Password (OTP) for verifying your account";
const OTP_SENT_MESSAGE = "OTP Sent";
const USER_NOT_EXIST = "Email Not Found";
const PASSWORD_INCORRECT = "Email or Password is wrong";
const USER_LOGIN_MESSAGE = "Logged In";
const OTP_EXPIRED = "OTP expired";
const INCORRECT_OTP = "OTP is incorrect";
const USER_VERIFIED = "Verified";
const ERROR_HAPPENED = "something went wrong";
const PASSWORD_RESET = "password reset"

// EMAIL Related
const USER_REGISTRATION_EMAIL_SUBJECT = "OTP To Verify Your Account";
const FORGOT_PASSWORD_REQUEST_SUBJECT= "Your One-Time Password (OTP) for reset your account"
const FORGOT_PASSWORD_REQUEST_MESSAGE =
  "OTP To Reset Your Account Password";


// Task Controller
const LATEST_TASKS_MESSAGE = "Latest tasks fetched";
const MOST_PAYING_TASKS_MESSAGE = "Most paying tasks fetched";
const FILTER_TASKS_MESSAGE = "Task filtered";


// Middlewares
const NOT_AUTHORIZED = "Unauthorized user";
const INVALID_TOKEN = "Invalid token";

// User Controller
const NEW_TASK_CREATED_MESSAGE = "Task created";

// Category Controller
const NEW_CATEGORY_CREATED_MESSAGE = "Category created";

export {
  REMOVE_USER_SAVED_TASK,
  USER_ALREADY_EXIST,
  USERNAME_ALREADY_EXIST,
  USER_CREATED,
  OTP_EXPIRY_IN_MINUTES,
  USER_REGISTRATION_MESSAGE,
  USER_REGISTRATION_EMAIL_SUBJECT,
  OTP_SENT_MESSAGE,
  USER_NOT_EXIST,
  PASSWORD_INCORRECT,
  USER_LOGIN_MESSAGE,
  OTP_EXPIRED,
  INCORRECT_OTP,
  USER_VERIFIED,
  FORGOT_PASSWORD_REQUEST_MESSAGE,
  FORGOT_PASSWORD_REQUEST_SUBJECT,
  ERROR_HAPPENED,
  PASSWORD_RESET,
  MOST_PAYING_TASKS_MESSAGE,
  LATEST_TASKS_MESSAGE,
  FILTER_TASKS_MESSAGE,
  NOT_AUTHORIZED,
  INVALID_TOKEN,
  NEW_TASK_CREATED_MESSAGE,
  NEW_CATEGORY_CREATED_MESSAGE
};
