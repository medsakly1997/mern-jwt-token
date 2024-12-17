import express, { Request, Response } from "express";
import { PORT as port } from "../src/constants/env";
import { NODE_ENV } from "../src/constants/env";
import dotenv from "dotenv";
import connectToDatabase from "./config/db";
dotenv.config();

// Create a new express application instance
const app = express();

// Set the network port

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Start the Express server
app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server Information:`);
  console.log(`  • Environment: ${NODE_ENV}`);
  console.log(`  • Server URL: http://localhost:${port}`);

  connectToDatabase();
});
