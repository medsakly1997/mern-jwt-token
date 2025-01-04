import { JWT_REFRESH_SECRET, JWT_SECRET } from "@/constants/env";
import verificationCodeType from "@/constants/verificationCodeType";
import SessionModel from "@/models/session.model";
import { UserModel } from "@/models/user.model";
import VerificationCodeModel from "@/models/verificationCode.model";
import { oneYearFromNow } from "@/utils/date";
var jwt = require("jsonwebtoken");

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

  const session = await SessionModel.create({
    sessionId: user._id,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token

  const refreshToken = jwt.sign(
    {
      session: session._id,
    },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );

  const accessToken = jwt.sign(
    {
      userId: user._id,
      session: session._id,
    },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "1h",
    }
  );
  // return user & tokens

  return {
    user,
    accessToken,
    refreshToken,
  };
};
