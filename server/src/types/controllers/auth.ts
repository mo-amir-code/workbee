

interface IsUserValidWithEmailAndUsernameType{
    isUsernameValid: boolean,
    isUserExist: boolean,
    isUserVerified: boolean,
    userId: number;
}

interface MailTemplateType {
    name: string;
    otp: number;
    message: string;
    link?: string;
    expireTime: number;
  }


export type {
    IsUserValidWithEmailAndUsernameType,
    MailTemplateType
}