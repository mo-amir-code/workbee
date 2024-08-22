interface IsUserValidWithEmailAndUsernameType {
  isUsernameValid: boolean;
  isUserExist: boolean;
  isUserVerified: boolean;
  userId: number | null;
}

interface MailTemplateType {
  name: string;
  otp: number;
  message: string;
  link?: string;
  expireTime: number;
}

interface JWTTokenVerifierType {
  userId: number;
  authId: number;
}

export type {
  IsUserValidWithEmailAndUsernameType,
  MailTemplateType,
  JWTTokenVerifierType,
};
