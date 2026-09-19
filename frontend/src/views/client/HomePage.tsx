import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { PromoCarousel } from "../../components/PromoCarousel";
import { CategoryPills } from "../../components/CategoryPills";
import { ProductCard } from "../../components/ProductCard";
import { CartDrawer } from "../../components/CartDrawer";
import { CheckoutModal } from "../../components/CheckoutModal";
import { productsApi } from "../../api/products";
import { Category, Product } from "../../types";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "TODOS">("TODOS");
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    productsApi
      .listPublic()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory === "TODOS") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === selectedCategory));
    }
  }, [products, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Header onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Carousel de promoções */}
          <section className="my-6">
            <PromoCarousel />
          </section>

          {/* Filtro de categorias */}
          <section className="mb-8">
            <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
          </section>

          {/* Grade de produtos */}
          <section>
            <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">
              {selectedCategory === "TODOS" ? "Todos os produtos" : selectedCategory}
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <p className="text-zinc-400">Carregando produtos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <p className="text-zinc-400">Nenhum produto nesta categoria no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} pixKey="74991234567" />
    </div>
  );
}
