import { Router } from "express";
import { productController } from "../controllers/productController";
import { requireAdminAuth } from "../middleware/authMiddleware";

// Rotas públicas — usadas pela vitrine do cliente
export const publicProductRoutes = Router();
publicProductRoutes.get("/products", productController.listPublic);
publicProductRoutes.get("/products/:id", productController.getById);

// Rotas administrativas — protegidas por JWT
export const adminProductRoutes = Router();
adminProductRoutes.use(requireAdminAuth);
adminProductRoutes.get("/products", productController.listAdmin);
adminProductRoutes.post("/products", productController.create);
adminProductRoutes.put("/products/:id", productController.update);
adminProductRoutes.delete("/products/:id", productController.remove);
