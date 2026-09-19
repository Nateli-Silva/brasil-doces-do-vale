import { ReactNode, useState } from "react";
import { LogOut, Menu, X, Package, Clock, ShoppingCart } from "lucide-react";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/authStore";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
  currentTab: "products" | "slots" | "orders";
  onTabChange: (tab: "products" | "slots" | "orders") => void;
}

export function AdminLayout({ title, children, currentTab, onTabChange }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const admin = useAuthStore((s) => s.admin);

  const tabs = [
    { id: "products", label: "Produtos", icon: Package },
    { id: "slots", label: "Horários de entrega", icon: Clock },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
  ];

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-zinc-950 transition-transform duration-300 ease-in-out md:relative md:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-full ring-2 ring-brand-gold" />
              <div>
                <p className="font-display text-sm font-bold text-white">Admin</p>
                <p className="text-xs text-brand-gold">{admin?.username}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-brand-green text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500/10 py-2 text-sm font-bold text-red-400 ring-1 ring-red-500/30 transition hover:bg-red-500/20"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-white/10 bg-zinc-950/80 backdrop-blur px-4 py-3 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 md:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-display text-lg font-bold text-white sm:text-xl">{title}</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
