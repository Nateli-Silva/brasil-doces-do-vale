import { Router } from "express";
import { authController } from "../controllers/authController";
import { requireAdminAuth } from "../middleware/authMiddleware";

export const authRoutes = Router();
authRoutes.post("/admin/login", authController.login);
authRoutes.get("/admin/me", requireAdminAuth, authController.me);
