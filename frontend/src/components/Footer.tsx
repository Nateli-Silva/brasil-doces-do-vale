import { Instagram, MapPin, Phone } from "lucide-react";
import logo from "../assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-gradient-to-b from-zinc-950 to-brand-greenDark/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Brasil Doces do Vale" className="h-16 w-16 rounded-full ring-2 ring-brand-gold" />
            <div>
              <p className="font-display text-lg font-bold text-white">Brasil Doces do Vale</p>
              <p className="text-sm text-brand-gold">O sabor do Brasil em cada mordida</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-zinc-300">
            <span className="flex items-center justify-center gap-2 sm:justify-start">
              <MapPin size={16} className="text-brand-green" /> Juazeiro - BA, Brasil
            </span>
            <span className="flex items-center justify-center gap-2 sm:justify-start">
              <Phone size={16} className="text-brand-green" /> +55 74 8132-4126
            </span>
            <a
              href="https://instagram.com/brasildocesdovale"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 hover:text-brand-gold sm:justify-start"
            >
              <Instagram size={16} className="text-brand-green" /> @brasildocesdovale
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
          {["Varejo e atacado", "Ideal para revenda", "Doces artesanais"].map((seal) => (
            <span
              key={seal}
              className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold text-brand-green ring-1 ring-brand-green/40"
            >
              {seal}
            </span>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500 sm:text-left">
          © {new Date().getFullYear()} Brasil Doces do Vale. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
