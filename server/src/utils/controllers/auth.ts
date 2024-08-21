import bcrypt from "bcrypt";
import {
  BCRYPT_SALT_ROUND,
  JWT_SECRET,
  OTP_TOKEN_AGE,
} from "src/config/index.js";
import jwt from "jsonwebtoken";
import { COOKIE_AGE_15_DAY, COOKIE_AGE_3_DAY } from "src/constants/index.js";

const generateHashCode = async (str: string): Promise<string> => {
  const hashedString = await bcrypt.hash(str, BCRYPT_SALT_ROUND);
  return hashedString;
};

const generateOTP = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateOTPToken = async ({
  userId,
  authId,
}: {
  userId: number;
  authId: number;
}): Promise<string> => {
  const token = await jwt.sign({ userId, authId }, JWT_SECRET as string, {
    expiresIn: OTP_TOKEN_AGE,
  });
  return token;
};

const generateRefreshAndAccessToken = async ({
  userId,
  authId,
}: {
  userId: number;
  authId: number;
}): Promise<{ refreshToken: string; accessToken: string }> => {
  const refreshToken = await jwt.sign(
    { userId, authId },
    JWT_SECRET as string,
    {
      expiresIn: COOKIE_AGE_15_DAY,
    }
  );
  const accessToken = await jwt.sign({ userId, authId }, JWT_SECRET as string, {
    expiresIn: COOKIE_AGE_3_DAY,
  });

  return {
    refreshToken,
    accessToken,
  };
};

const isPasswordCorrect = async ({
  plainPassword,
  hashedPassword,
}: {
  plainPassword: string;
  hashedPassword: string;
}): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export {
  generateHashCode,
  generateOTP,
  generateOTPToken,
  isPasswordCorrect,
  generateRefreshAndAccessToken,
};
