import { Router } from "express";
import { registerHandler } from "@/controllers/auth.controller";

const authRoutes = Router();

// Prefix: /auth

authRoutes.post("/register", registerHandler);

export default authRoutes;
