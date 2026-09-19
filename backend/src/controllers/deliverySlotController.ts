import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../config/db";

const slotSchema = z.object({
  label: z.string().min(3),
  dayOfWeek: z.string().optional(),
  startTime: z.string().min(3),
  endTime: z.string().min(3),
  active: z.boolean().optional(),
});

export const deliverySlotController = {
  // GET /api/delivery-slots (público — apenas horários ativos, para o <select> do cliente)
  async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const slots = await prisma.deliverySlot.findMany({
        where: { active: true },
        orderBy: { id: "asc" },
      });
      res.json(slots);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/admin/delivery-slots (admin — todos, ativos ou não)
  async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const slots = await prisma.deliverySlot.findMany({ orderBy: { id: "asc" } });
      res.json(slots);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/admin/delivery-slots
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = slotSchema.parse(req.body);
      const slot = await prisma.deliverySlot.create({ data });
      res.status(201).json(slot);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/admin/delivery-slots/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = slotSchema.partial().parse(req.body);
      const slot = await prisma.deliverySlot.update({ where: { id }, data });
      res.json(slot);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/admin/delivery-slots/:id
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const inUse = await prisma.order.findFirst({ where: { deliverySlotId: id } });
      if (inUse) {
        // Em vez de excluir (quebraria pedidos históricos), apenas desativa
        const slot = await prisma.deliverySlot.update({ where: { id }, data: { active: false } });
        return res.json({ deactivated: true, slot });
      }
      await prisma.deliverySlot.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
