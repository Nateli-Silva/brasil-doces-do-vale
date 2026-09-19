import { env } from "../config/env";

interface OrderItemForMessage {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface OrderForMessage {
  id: number;
  customerName: string;
  customerPhone: string;
  address: string;
  neighborhood?: string | null;
  reference?: string | null;
  deliverySlotLabel: string;
  paymentMethod: "PIX" | "DINHEIRO" | "CARTAO";
  changeFor?: number | null;
  items: OrderItemForMessage[];
  subtotal: number;
  total: number;
  notes?: string | null;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function paymentLabel(method: OrderForMessage["paymentMethod"], changeFor?: number | null): string {
  if (method === "PIX") return "Pix";
  if (method === "CARTAO") return "Cartão na entrega";
  if (method === "DINHEIRO") {
    return changeFor && changeFor > 0
      ? `Dinheiro na entrega (troco para ${formatCurrency(changeFor)})`
      : "Dinheiro na entrega (sem troco)";
  }
  return method;
}

/**
 * Monta o texto do pedido no formato que a loja recebe no WhatsApp.
 */
export function buildOrderMessage(order: OrderForMessage): string {
  const lines: string[] = [];

  lines.push("🍫 *NOVO PEDIDO — Brasil Doces do Vale* 🍫");
  lines.push(`Pedido #${order.id}`);
  lines.push("");
  lines.push(`*Cliente:* ${order.customerName}`);
  lines.push(`*Telefone:* ${order.customerPhone}`);

  const addressParts = [order.address, order.neighborhood, order.reference].filter(Boolean);
  lines.push(`*Endereço:* ${addressParts.join(" - ")}`);
  lines.push(`*Horário de entrega:* ${order.deliverySlotLabel}`);
  lines.push(`*Pagamento:* ${paymentLabel(order.paymentMethod, order.changeFor)}`);
  lines.push("");
  lines.push("*Itens do pedido:*");

  for (const item of order.items) {
    const lineTotal = item.quantity * item.unitPrice;
    lines.push(`• ${item.quantity}x ${item.productName} — ${formatCurrency(lineTotal)}`);
  }

  lines.push("");
  lines.push(`*Subtotal:* ${formatCurrency(order.subtotal)}`);
  lines.push(`*Total:* ${formatCurrency(order.total)}`);

  if (order.notes) {
    lines.push("");
    lines.push(`*Observações:* ${order.notes}`);
  }

  lines.push("");
  lines.push("_O sabor do Brasil em cada mordida!_ 🇧🇷");

  return lines.join("\n");
}

/**
 * Gera o link wa.me pronto para abrir o WhatsApp da loja com a mensagem preenchida.
 */
export function buildWhatsappLink(order: OrderForMessage): string {
  const message = buildOrderMessage(order);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${env.storeWhatsappNumber}?text=${encoded}`;
}
