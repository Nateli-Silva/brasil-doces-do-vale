import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../config/db";
import { HttpError } from "../middleware/errorHandler";

const categoryEnum = z.enum(["TRUFAS", "CONES", "BRIGADEIROS", "ALFAJORES", "COMBOS", "REVENDA"]);

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  imageUrl: z.string().optional(),
  category: categoryEnum,
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const productController = {
  // GET /api/products  (público — vitrine do cliente, apenas produtos ativos)
  async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query;
      const products = await prisma.product.findMany({
        where: {
          active: true,
          ...(category ? { category: category as any } : {}),
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      });
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/admin/products  (admin — todos os produtos, ativos ou não)
  async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/products/:id
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) throw new HttpError(404, "Produto não encontrado.");
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/admin/products
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = productSchema.parse(req.body);
      const product = await prisma.product.create({ data });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/admin/products/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = productSchema.partial().parse(req.body);
      const product = await prisma.product.update({ where: { id }, data });
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/admin/products/:id
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await prisma.product.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
