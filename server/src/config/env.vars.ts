// ENVIRONMENTS VARIABLS IMPORT
const APP_PORT = process.env.APP_PORT;
const DB_URL = process.env.DB_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;
const REDIS_URI = process.env.REDIS_URI;
const NODE_MAILER_EMAIL = process.env.NODE_MAILER_EMAIL;
const NODE_MAILER_PASS = process.env.NODE_MAILER_PASS;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const ROOT_DOMAIN = process.env.ROOT_DOMAIN;

//  <---- Constants for configurations only ---->

// Email Realated Constants
const SEND_EMAIL_FROM = "noreply@workbee.xyz";
const BCRYPT_SALT_ROUND = 12;
const OTP_TOKEN_AGE = "15m";

// COMPANY RELATED
const COMPANY_NAME = "WorkBee";

export {
  APP_PORT,
  DB_URL,
  ENVIRONMENT,
  REDIS_URI,
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASS,
  SEND_EMAIL_FROM,
  BCRYPT_SALT_ROUND,
  JWT_SECRET,
  OTP_TOKEN_AGE,
  COMPANY_NAME,
  CLIENT_ORIGIN,
  ROOT_DOMAIN,
};
