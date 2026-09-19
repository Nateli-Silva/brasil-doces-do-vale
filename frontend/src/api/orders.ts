import { api } from "./client";
import { CreateOrderPayload, Order, OrderStatus } from "../types";

export const ordersApi = {
  create: (data: CreateOrderPayload) =>
    api.post<{ order: Order; whatsappLink: string }>("/api/orders", data).then((r) => r.data),

  listAdmin: () => api.get<Order[]>("/api/admin/orders").then((r) => r.data),

  updateStatus: (id: number, status: OrderStatus) =>
    api.patch<Order>(`/api/admin/orders/${id}/status`, { status }).then((r) => r.data),
};
