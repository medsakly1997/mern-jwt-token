import verificationCodeType from "@/constants/verificationCodeType";
import { UserModel } from "@/models/user.model";
import VerificationCodeModel from "@/models/verificationCode.model";
import { oneYearFromNow } from "@/utils/date";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const CreateAccount = async (data: CreateAccountParams) => {
  // verify existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verification = await VerificationCodeModel.create({
    userId: user._id,
    type: verificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verification email
  // create session
  // sign access token & refresh token
  // return user & tokens
};
