import { api } from "./client";
import { Category, Product } from "../types";

export const productsApi = {
  listPublic: (category?: Category) =>
    api.get<Product[]>("/api/products", { params: category ? { category } : {} }).then((r) => r.data),

  listAdmin: () => api.get<Product[]>("/api/admin/products").then((r) => r.data),

  create: (data: Partial<Product>) => api.post<Product>("/api/admin/products", data).then((r) => r.data),

  update: (id: number, data: Partial<Product>) =>
    api.put<Product>(`/api/admin/products/${id}`, data).then((r) => r.data),

  remove: (id: number) => api.delete(`/api/admin/products/${id}`),
};
