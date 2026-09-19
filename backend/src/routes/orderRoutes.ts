import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { requireAdminAuth } from "../middleware/authMiddleware";

// Rota pública — criação do pedido pelo cliente (checkout)
export const publicOrderRoutes = Router();
publicOrderRoutes.post("/orders", orderController.create);

// Rotas administrativas — painel de pedidos
export const adminOrderRoutes = Router();
adminOrderRoutes.use(requireAdminAuth);
adminOrderRoutes.get("/orders", orderController.listAdmin);
adminOrderRoutes.get("/orders/:id", orderController.getById);
adminOrderRoutes.patch("/orders/:id/status", orderController.updateStatus);
