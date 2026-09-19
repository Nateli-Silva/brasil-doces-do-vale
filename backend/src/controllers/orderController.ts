import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Product } from "@prisma/client";
import { prisma } from "../config/db";
import { HttpError } from "../middleware/errorHandler";
import { buildWhatsappLink } from "../services/whatsappService";

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(8),
  address: z.string().min(5),
  neighborhood: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.enum(["PIX", "DINHEIRO", "CARTAO"]),
  changeFor: z.number().optional(),
  deliverySlotId: z.number().int(),
  items: z
    .array(
      z.object({
        productId: z.number().int(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "O pedido precisa ter ao menos um item."),
  notes: z.string().optional(),
});

export const orderController = {
  // POST /api/orders  (público — checkout do cliente)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = orderSchema.parse(req.body);

      const slot = await prisma.deliverySlot.findUnique({ where: { id: data.deliverySlotId } });
      if (!slot || !slot.active) {
        throw new HttpError(400, "Horário de entrega inválido ou indisponível.");
      }

      const productIds = data.items.map((i) => i.productId);
      const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

      if (products.length !== new Set(productIds).size) {
        throw new HttpError(400, "Um ou mais produtos do pedido não existem.");
      }

      const inactive = products.find((p: Product) => !p.active);
      if (inactive) {
        throw new HttpError(400, `O produto "${inactive.name}" não está mais disponível.`);
      }

      // Preços SEMPRE calculados no servidor (nunca confiar no valor enviado pelo cliente)
      let subtotal = 0;
      const itemsData = data.items.map((item) => {
        const product = products.find((p: Product) => p.id === item.productId)!;
        subtotal += product.price * item.quantity;
        return {
          productId: product.id,
          quantity: item.quantity,
          unitPrice: product.price,
        };
      });

      const total = subtotal; // espaço reservado para taxa de entrega/desconto no futuro

      const order = await prisma.order.create({
        data: {
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          address: data.address,
          neighborhood: data.neighborhood,
          reference: data.reference,
          paymentMethod: data.paymentMethod,
          changeFor: data.paymentMethod === "DINHEIRO" ? data.changeFor : undefined,
          deliverySlotId: data.deliverySlotId,
          subtotal,
          total,
          notes: data.notes,
          items: { create: itemsData },
        },
        include: { items: { include: { product: true } }, deliverySlot: true },
      });

      const whatsappLink = buildWhatsappLink({
        id: order.id,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        address: order.address,
        neighborhood: order.neighborhood,
        reference: order.reference,
        deliverySlotLabel: order.deliverySlot.label,
        paymentMethod: order.paymentMethod,
        changeFor: order.changeFor,
        items: order.items.map((i: { quantity: number; unitPrice: number; product: Product }) => ({
          productName: i.product.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        subtotal: order.subtotal,
        total: order.total,
        notes: order.notes,
      });

      res.status(201).json({ order, whatsappLink });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/admin/orders  (admin — painel de pedidos)
  async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await prisma.order.findMany({
        include: { items: { include: { product: true } }, deliverySlot: true },
        orderBy: { createdAt: "desc" },
      });
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/admin/orders/:id
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const order = await prisma.order.findUnique({
        where: { id },
        include: { items: { include: { product: true } }, deliverySlot: true },
      });
      if (!order) throw new HttpError(404, "Pedido não encontrado.");
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/admin/orders/:id/status
  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { status } = z
        .object({
          status: z.enum(["PENDENTE", "CONFIRMADO", "EM_PREPARO", "SAIU_PARA_ENTREGA", "ENTREGUE", "CANCELADO"]),
        })
        .parse(req.body);

      const order = await prisma.order.update({ where: { id }, data: { status } });
      res.json(order);
    } catch (err) {
      next(err);
    }
  },
};
