import { Router } from "express";
import { publicProductRoutes, adminProductRoutes } from "./productRoutes";
import { publicDeliverySlotRoutes, adminDeliverySlotRoutes } from "./deliverySlotRoutes";
import { publicOrderRoutes, adminOrderRoutes } from "./orderRoutes";
import { authRoutes } from "./authRoutes";

export const router = Router();

// --- Rotas públicas (vitrine / checkout do cliente) ---
router.use("/api", publicProductRoutes);
router.use("/api", publicDeliverySlotRoutes);
router.use("/api", publicOrderRoutes);

// --- Autenticação ---
router.use("/api", authRoutes);

// --- Rotas administrativas (protegidas por JWT) ---
router.use("/api/admin", adminProductRoutes);
router.use("/api/admin", adminDeliverySlotRoutes);
router.use("/api/admin", adminOrderRoutes);

router.get("/api/health", (_req, res) => res.json({ status: "ok" }));
