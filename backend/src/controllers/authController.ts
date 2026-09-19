import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../config/db";
import { env } from "../config/env";
import { HttpError } from "../middleware/errorHandler";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const authController = {
  // POST /api/admin/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = loginSchema.parse(req.body);

      const admin = await prisma.admin.findUnique({ where: { username } });
      if (!admin) throw new HttpError(401, "Usuário ou senha inválidos.");

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) throw new HttpError(401, "Usuário ou senha inválidos.");

      const token = jwt.sign({ id: admin.id, username: admin.username }, env.jwtSecret, {
        expiresIn: "12h",
      });

      res.json({ token, admin: { id: admin.id, username: admin.username } });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/admin/me  (valida se o token ainda é válido)
  async me(req: Request, res: Response) {
    res.json({ admin: req.admin });
  },
};
