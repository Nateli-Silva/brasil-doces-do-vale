import { Plus } from "lucide-react";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 transition hover:ring-brand-green/60">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-brand-greenDark to-zinc-900">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">🍫</div>
        )}
        {product.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-900">
            Irresistível!
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-sm font-bold text-white sm:text-base">{product.name}</h3>
        {product.description && (
          <p className="line-clamp-2 text-xs text-zinc-400 sm:text-sm">{product.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-base font-extrabold text-brand-gold sm:text-lg">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1 rounded-full bg-brand-green px-3 py-1.5 text-xs font-bold text-white transition hover:bg-brand-greenDark sm:text-sm"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
