import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./views/client/HomePage";
import { LoginPage } from "./views/admin/LoginPage";
import { AdminLayout } from "./views/admin/AdminLayout";
import { ProductsPage } from "./views/admin/ProductsPage";
import { DeliverySlotsPage } from "./views/admin/DeliverySlotsPage";
import { OrdersPage } from "./views/admin/OrdersPage";
import { useAuthStore } from "./store/authStore";
import { authApi } from "./api/auth";

function AdminDashboard() {
  const [tab, setTab] = useState<"products" | "slots" | "orders">("products");
  const token = useAuthStore((s) => s.token);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    if (!token) return;
    authApi.me().catch(() => {
      useAuthStore.getState().logout();
    });
  }, [token]);

  const tabs = {
    products: <ProductsPage />,
    slots: <DeliverySlotsPage />,
    orders: <OrdersPage />,
  };

  const titles = {
    products: "Gerenciador de Produtos",
    slots: "Horários de Entrega",
    orders: "Painel de Pedidos",
  };

  return (
    <AdminLayout title={titles[tab]} currentTab={tab} onTabChange={setTab}>
      {tabs[tab]}
    </AdminLayout>
  );
}

function ProtectedAdminRoute() {
  const token = useAuthStore((s) => s.token);
  return token ? <AdminDashboard /> : <Navigate to="/admin/login" />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<ProtectedAdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
