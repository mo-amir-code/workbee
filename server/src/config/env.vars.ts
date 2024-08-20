// ENVIRONMENTS VARIABLS IMPORT
const APP_PORT = process.env.APP_PORT;
const DB_URL = process.env.DB_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;
const REDIS_URI = process.env.REDIS_URI;
const NODE_MAILER_EMAIL = process.env.NODE_MAILER_EMAIL;
const NODE_MAILER_PASS = process.env.NODE_MAILER_PASS;


// Constants for configurations only
const SEND_EMAIL_FROM = "noreply@workbee.xyz"

export {
    APP_PORT,
    DB_URL,
    ENVIRONMENT,
    REDIS_URI,
    NODE_MAILER_EMAIL,
    NODE_MAILER_PASS,
    SEND_EMAIL_FROM
}