import { CookieOptions } from "express";
import { ROOT_DOMAIN } from "src/config/index.js";

const ACCESS_TOKEN_EXPIRY_TIME = "2d";
const REFRESH_TOKEN_EXPIRY_TIME = "8d";

const SINGLE_DAY_IN_NUMBERS = 1000 * 60 * 60 * 24;

const COOKIE_AGE_15_DAY = 15 * 24 * 60 * 60 * 1000;
const COOKIE_AGE_3_DAY = 3 * 24 * 60 * 60 * 1000;
const COOKIE_AGE_15_MINUTES = 1000 * 60 * 15;

const ACCESS_TOKEN_NAME = "accesstoken";
const REFRESH_TOKEN_NAME = "refreshtoken";
const OTP_TOKEN_NAME = "otptoken";


const commonCookieTokenOptions:CookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "none"
}


const accessCookieOptions: CookieOptions = {
    ...commonCookieTokenOptions,
    maxAge: COOKIE_AGE_3_DAY, 
    domain: ROOT_DOMAIN,
}


const refreshCookieOptions: CookieOptions = {
    ...commonCookieTokenOptions,
    maxAge: COOKIE_AGE_15_DAY, 
    domain: ROOT_DOMAIN
}

const otpTokenCookieOptions: CookieOptions = {
    ...commonCookieTokenOptions,
    maxAge: COOKIE_AGE_15_MINUTES, 
    domain: ROOT_DOMAIN
}


export {
    ACCESS_TOKEN_EXPIRY_TIME,
    REFRESH_TOKEN_EXPIRY_TIME,
    refreshCookieOptions,
    accessCookieOptions,
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
    SINGLE_DAY_IN_NUMBERS,
    otpTokenCookieOptions,
    OTP_TOKEN_NAME,
    COOKIE_AGE_15_DAY,
    COOKIE_AGE_15_MINUTES,
    COOKIE_AGE_3_DAY
}