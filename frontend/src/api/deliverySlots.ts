import { api } from "./client";
import { DeliverySlot } from "../types";

export const deliverySlotsApi = {
  listPublic: () => api.get<DeliverySlot[]>("/api/delivery-slots").then((r) => r.data),

  listAdmin: () => api.get<DeliverySlot[]>("/api/admin/delivery-slots").then((r) => r.data),

  create: (data: Partial<DeliverySlot>) =>
    api.post<DeliverySlot>("/api/admin/delivery-slots", data).then((r) => r.data),

  update: (id: number, data: Partial<DeliverySlot>) =>
    api.put<DeliverySlot>(`/api/admin/delivery-slots/${id}`, data).then((r) => r.data),

  remove: (id: number) => api.delete(`/api/admin/delivery-slots/${id}`),
};
