import { api } from "./client";
import { AdminUser } from "../types";

export const authApi = {
  login: (username: string, password: string) =>
    api.post<{ token: string; admin: AdminUser }>("/api/admin/login", { username, password }).then((r) => r.data),

  me: () => api.get<{ admin: AdminUser }>("/api/admin/me").then((r) => r.data),
};
