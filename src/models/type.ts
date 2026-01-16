import { Request } from "express";

export interface AuthUser {
  id: string;
  role: "admin" | "vendor" | "customer";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
