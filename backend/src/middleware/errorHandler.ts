import { BAD_REQUEST } from "@/constants/http";
import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  res.status(BAD_REQUEST).json({
    message: error.message,
    errors: errors,
  });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`${req.path}`);

  if (err instanceof z.ZodError) {
    handleZodError(res, err);
    return;
  }
  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
