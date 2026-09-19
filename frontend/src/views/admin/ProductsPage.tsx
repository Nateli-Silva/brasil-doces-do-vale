import { useEffect, useState, FormEvent } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import { Product, CATEGORY_LABELS, Category } from "../../types";
import { productsApi } from "../../api/products";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: Category;
  featured: boolean;
  active: boolean;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    category: "TRUFAS",
    featured: false,
    active: true,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.listAdmin();
      setProducts(data);
    } catch {
      setError("Falha ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  function openForm(product?: Product) {
    if (product) {
      setEditing(product);
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        category: product.category,
        featured: product.featured,
        active: product.active,
      });
    } else {
      setEditing(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "TRUFAS",
        featured: false,
        active: true,
      });
    }
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        featured: formData.featured,
        active: formData.active,
      };

      if (editing) {
        await productsApi.update(editing.id, payload);
      } else {
        await productsApi.create(payload);
      }

      loadProducts();
      closeForm();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao salvar produto");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que quer excluir este produto?")) return;

    try {
      await productsApi.remove(id);
      loadProducts();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao excluir produto");
    }
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">Gerencie o catálogo de doces</p>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-bold text-white hover:bg-brand-greenDark"
        >
          <Plus size={16} /> Novo produto
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 ring-1 ring-red-500/30">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-zinc-400">Carregando...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhum produto cadastrado</p>
      ) : (
        <div className="overflow-x-auto rounded-lg ring-1 ring-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-zinc-900">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-zinc-300">Nome</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-300">Categoria</th>
                <th className="px-4 py-2 text-right font-semibold text-zinc-300">Preço</th>
                <th className="px-4 py-2 text-center font-semibold text-zinc-300">Status</th>
                <th className="px-4 py-2 text-right font-semibold text-zinc-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2 text-xs text-zinc-400">{CATEGORY_LABELS[product.category]}</td>
                  <td className="px-4 py-2 text-right font-semibold text-brand-gold">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                        product.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openForm(product)}
                        className="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded p-1 text-zinc-400 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal do formulário */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-zinc-950 ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="font-display text-lg font-bold text-white">
                {editing ? "Editar produto" : "Novo produto"}
              </h2>
              <button onClick={closeForm} className="rounded-full p-1 text-zinc-400 hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Nome</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full resize-none rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-400">Preço</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-400">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Produto em destaque
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  Ativo
                </label>
              </div>

              <div className="flex gap-2 border-t border-white/10 pt-4">
                <button type="button" onClick={closeForm} className="flex-1 rounded-lg bg-zinc-800 py-2 font-bold text-white">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-brand-green py-2 font-bold text-white hover:bg-brand-greenDark">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
