import { Category, CATEGORY_LABELS } from "../types";

interface CategoryPillsProps {
  selected: Category | "TODOS";
  onSelect: (category: Category | "TODOS") => void;
}

const CATEGORIES: (Category | "TODOS")[] = [
  "TODOS",
  "TRUFAS",
  "CONES",
  "BRIGADEIROS",
  "ALFAJORES",
  "COMBOS",
  "REVENDA",
];

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((cat) => {
        const label = cat === "TODOS" ? "Todos" : CATEGORY_LABELS[cat];
        const active = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              active
                ? "bg-brand-gold text-zinc-900 shadow-glow"
                : "bg-white/5 text-zinc-300 ring-1 ring-white/10 hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
