import { CREATED } from "@/constants/http";
import { CreateAccount } from "@/services/auth.services";
import catchErrors from "@/utils/catchErrors";
import { setAuthCookies } from "@/utils/cookies";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email().min(6).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not mactch",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res) => {
  //validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call service

  const { user, accessToken, refreshToken } = await CreateAccount(request);
  //return response

  setAuthCookies({ res, accessToken, refreshToken });
  return res.status(CREATED).json(user);
});
