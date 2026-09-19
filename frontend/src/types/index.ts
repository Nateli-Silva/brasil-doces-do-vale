export type Category = "TRUFAS" | "CONES" | "BRIGADEIROS" | "ALFAJORES" | "COMBOS" | "REVENDA";

export type PaymentMethod = "PIX" | "DINHEIRO" | "CARTAO";

export type OrderStatus = "PENDENTE" | "CONFIRMADO" | "EM_PREPARO" | "SAIU_PARA_ENTREGA" | "ENTREGUE" | "CANCELADO";

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category: Category;
  active: boolean;
  featured: boolean;
  createdAt: string;
}

export interface DeliverySlot {
  id: number;
  label: string;
  dayOfWeek?: string | null;
  startTime: string;
  endTime: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItemPayload {
  productId: number;
  quantity: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  address: string;
  neighborhood?: string;
  reference?: string;
  paymentMethod: PaymentMethod;
  changeFor?: number;
  deliverySlotId: number;
  items: OrderItemPayload[];
  notes?: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  address: string;
  neighborhood?: string | null;
  reference?: string | null;
  paymentMethod: PaymentMethod;
  changeFor?: number | null;
  status: OrderStatus;
  subtotal: number;
  total: number;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
  deliverySlot: DeliverySlot;
}

export interface AdminUser {
  id: number;
  username: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  TRUFAS: "Trufas",
  CONES: "Cones",
  BRIGADEIROS: "Brigadeiros",
  ALFAJORES: "Alfajores",
  COMBOS: "Combos",
  REVENDA: "Revenda",
};

export const ORDER_STATUS: Record<OrderStatus, string> = {
  PENDENTE: "Pendente",
  CONFIRMADO: "Confirmado",
  EM_PREPARO: "Em preparo",
  SAIU_PARA_ENTREGA: "Saiu para entrega",
  ENTREGUE: "Entregue",
  CANCELADO: "Cancelado",
};
