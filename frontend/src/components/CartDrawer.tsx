import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, addItem, decrementItem, removeItem, totalPrice } = useCartStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-zinc-950 ring-1 ring-white/10 transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <ShoppingBag size={20} className="text-brand-green" /> Seu carrinho
          </h2>
          <button onClick={onClose} className="rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-zinc-500">Seu carrinho está vazio. Que tal adicionar uns docinhos? 🍫</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-brand-greenDark/40 text-2xl">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      "🍫"
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{product.name}</p>
                    <p className="text-xs text-brand-gold">{formatCurrency(product.price)}</p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
                    <button onClick={() => decrementItem(product.id)} className="text-zinc-300 hover:text-white">
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-white">{quantity}</span>
                    <button onClick={() => addItem(product)} className="text-zinc-300 hover:text-white">
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex items-center justify-between text-sm text-zinc-300">
              <span>Total</span>
              <span className="text-xl font-extrabold text-brand-gold">{formatCurrency(totalPrice())}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full rounded-full bg-brand-green py-3 font-bold text-white shadow-glow transition hover:bg-brand-greenDark"
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
