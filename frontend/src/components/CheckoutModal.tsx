import { FormEvent, useEffect, useState } from "react";
import { X, Banknote, CreditCard, QrCode } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { deliverySlotsApi } from "../api/deliverySlots";
import { ordersApi } from "../api/orders";
import { DeliverySlot, PaymentMethod } from "../types";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  pixKey?: string;
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function CheckoutModal({ open, onClose, pixKey = "74991234567" }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCartStore();

  const [slots, setSlots] = useState<DeliverySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [deliverySlotId, setDeliverySlotId] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PIX");
  const [changeFor, setChangeFor] = useState<string>("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoadingSlots(true);
    setError(null);
    deliverySlotsApi
      .listPublic()
      .then((data) => {
        setSlots(data);
        if (data.length > 0) setDeliverySlotId(data[0].id);
      })
      .catch(() => setError("Não foi possível carregar os horários de entrega. Tente novamente."))
      .finally(() => setLoadingSlots(false));
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Seu carrinho está vazio.");
      return;
    }
    if (!deliverySlotId) {
      setError("Selecione um horário de entrega.");
      return;
    }

    setSubmitting(true);
    try {
      const { whatsappLink } = await ordersApi.create({
        customerName,
        customerPhone,
        address,
        neighborhood: neighborhood || undefined,
        reference: reference || undefined,
        paymentMethod,
        changeFor: paymentMethod === "DINHEIRO" && changeFor ? Number(changeFor) : undefined,
        deliverySlotId: Number(deliverySlotId),
        notes: notes || undefined,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      });

      window.open(whatsappLink, "_blank");
      clearCart();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Não foi possível enviar o pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-zinc-950 ring-1 ring-white/10 sm:rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-zinc-950 p-4">
          <h2 className="font-display text-lg font-bold text-white">Finalizar pedido</h2>
          <button onClick={onClose} className="rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Nome completo</label>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Telefone / WhatsApp</label>
            <input
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
              placeholder="(74) 9 9999-9999"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">
              Endereço de entrega (Juazeiro-BA ou região)
            </label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
              placeholder="Rua, número"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-400">Bairro</label>
              <input
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                placeholder="Bairro"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-400">Ponto de referência</label>
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                placeholder="Opcional"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Horário de entrega</label>
            <select
              required
              value={deliverySlotId}
              onChange={(e) => setDeliverySlotId(Number(e.target.value))}
              disabled={loadingSlots || slots.length === 0}
              className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
            >
              {loadingSlots && <option>Carregando horários...</option>}
              {!loadingSlots && slots.length === 0 && <option>Nenhum horário disponível</option>}
              {slots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-zinc-400">Forma de pagamento</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("PIX")}
                className={`flex flex-col items-center gap-1 rounded-lg py-2 text-xs font-semibold ring-1 ${
                  paymentMethod === "PIX" ? "bg-brand-green text-white ring-brand-green" : "bg-zinc-900 text-zinc-300 ring-white/10"
                }`}
              >
                <QrCode size={18} /> Pix
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("DINHEIRO")}
                className={`flex flex-col items-center gap-1 rounded-lg py-2 text-xs font-semibold ring-1 ${
                  paymentMethod === "DINHEIRO" ? "bg-brand-green text-white ring-brand-green" : "bg-zinc-900 text-zinc-300 ring-white/10"
                }`}
              >
                <Banknote size={18} /> Dinheiro
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("CARTAO")}
                className={`flex flex-col items-center gap-1 rounded-lg py-2 text-xs font-semibold ring-1 ${
                  paymentMethod === "CARTAO" ? "bg-brand-green text-white ring-brand-green" : "bg-zinc-900 text-zinc-300 ring-white/10"
                }`}
              >
                <CreditCard size={18} /> Cartão
              </button>
            </div>
            <p className="mt-1 text-[11px] text-zinc-500">Dinheiro e cartão são pagos na entrega.</p>
          </div>

          {paymentMethod === "PIX" && (
            <div className="rounded-lg bg-brand-green/10 p-3 text-sm text-zinc-200 ring-1 ring-brand-green/30">
              Chave Pix da loja: <span className="font-mono font-bold text-brand-gold">{pixKey}</span>
              <p className="mt-1 text-xs text-zinc-400">
                Envie o comprovante pelo WhatsApp junto com o pedido para agilizar a confirmação.
              </p>
            </div>
          )}

          {paymentMethod === "DINHEIRO" && (
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-400">Troco para quanto? (opcional)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={changeFor}
                onChange={(e) => setChangeFor(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                placeholder="Ex: 50"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Observações (opcional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
              placeholder="Alguma observação sobre o pedido?"
            />
          </div>

          {error && <p className="rounded-lg bg-red-500/10 p-2 text-sm text-red-400 ring-1 ring-red-500/30">{error}</p>}

          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-zinc-300">
            <span>Total do pedido</span>
            <span className="text-xl font-extrabold text-brand-gold">{formatCurrency(totalPrice())}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-green py-3 font-bold text-white shadow-glow transition hover:bg-brand-greenDark disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Enviar pedido pelo WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
