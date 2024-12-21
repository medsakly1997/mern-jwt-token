import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db";
import { NODE_ENV, PORT } from "./constants/env";
dotenv.config();

// Create a new express application instance
const app = express();

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server Information:`);
  console.log(`  • Environment: ${NODE_ENV}`);
  console.log(`  • Server URL: http://localhost:${PORT}`);

  connectToDatabase();
});
