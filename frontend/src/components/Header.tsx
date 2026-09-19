import { ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";
import { useCartStore } from "../store/cartStore";

interface HeaderProps {
  onOpenCart: () => void;
}

export function Header({ onOpenCart }: HeaderProps) {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Brasil Doces do Vale"
            className="h-12 w-12 rounded-full ring-2 ring-brand-gold object-cover"
          />
          <div>
            <h1 className="font-display text-lg font-bold leading-tight text-white sm:text-xl">
              Brasil Doces do Vale
            </h1>
            <p className="text-xs font-medium text-brand-gold sm:text-sm">
              O sabor do Brasil em cada mordida 🇧🇷
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 font-semibold text-white shadow-glow transition hover:bg-brand-greenDark"
        >
          <ShoppingCart size={20} />
          <span className="hidden sm:inline">Carrinho</span>
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-zinc-900">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
