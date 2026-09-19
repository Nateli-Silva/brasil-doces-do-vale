import { Category, OrderStatus, PaymentMethod } from "@prisma/client";

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: Category;
  active?: boolean;
  featured?: boolean;
}

export interface DeliverySlotInput {
  label: string;
  dayOfWeek?: string;
  startTime: string;
  endTime: string;
  active?: boolean;
}

export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface OrderInput {
  customerName: string;
  customerPhone: string;
  address: string;
  neighborhood?: string;
  reference?: string;
  paymentMethod: PaymentMethod;
  changeFor?: number;
  deliverySlotId: number;
  items: OrderItemInput[];
  notes?: string;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface AdminLoginInput {
  username: string;
  password: string;
}

export interface AuthenticatedRequestUser {
  id: number;
  username: string;
}
