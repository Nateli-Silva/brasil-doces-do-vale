import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthenticatedRequestUser } from "../types";

declare module "express-serve-static-core" {
  interface Request {
    admin?: AuthenticatedRequestUser;
  }
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token de autenticação ausente." });
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthenticatedRequestUser;
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
