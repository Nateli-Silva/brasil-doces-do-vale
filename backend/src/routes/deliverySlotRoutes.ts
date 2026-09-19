import { Router } from "express";
import { deliverySlotController } from "../controllers/deliverySlotController";
import { requireAdminAuth } from "../middleware/authMiddleware";

// Rota pública — usada no <select> de horário de entrega do checkout
export const publicDeliverySlotRoutes = Router();
publicDeliverySlotRoutes.get("/delivery-slots", deliverySlotController.listPublic);

// Rotas administrativas — gestão dos horários disponíveis
export const adminDeliverySlotRoutes = Router();
adminDeliverySlotRoutes.use(requireAdminAuth);
adminDeliverySlotRoutes.get("/delivery-slots", deliverySlotController.listAdmin);
adminDeliverySlotRoutes.post("/delivery-slots", deliverySlotController.create);
adminDeliverySlotRoutes.put("/delivery-slots/:id", deliverySlotController.update);
adminDeliverySlotRoutes.delete("/delivery-slots/:id", deliverySlotController.remove);
