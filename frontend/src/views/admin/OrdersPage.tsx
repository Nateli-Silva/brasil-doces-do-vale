import { useEffect, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import { Order, ORDER_STATUS, OrderStatus } from "../../types";
import { ordersApi } from "../../api/orders";

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDENTE: "bg-yellow-500/20 text-yellow-400",
  CONFIRMADO: "bg-blue-500/20 text-blue-400",
  EM_PREPARO: "bg-purple-500/20 text-purple-400",
  SAIU_PARA_ENTREGA: "bg-cyan-500/20 text-cyan-400",
  ENTREGUE: "bg-green-500/20 text-green-400",
  CANCELADO: "bg-red-500/20 text-red-400",
};

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersApi.listAdmin();
      setOrders(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch {
      setError("Falha ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, newStatus: OrderStatus) {
    try {
      await ordersApi.updateStatus(id, newStatus);
      loadOrders();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao atualizar status");
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("pt-BR");
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
    PENDENTE: ["CONFIRMADO", "CANCELADO"],
    CONFIRMADO: ["EM_PREPARO", "CANCELADO"],
    EM_PREPARO: ["SAIU_PARA_ENTREGA", "CANCELADO"],
    SAIU_PARA_ENTREGA: ["ENTREGUE"],
    ENTREGUE: [],
    CANCELADO: [],
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">Painel de pedidos recebidos pelo WhatsApp</p>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-bold text-white hover:bg-brand-greenDark"
        >
          <RefreshCw size={16} /> Atualizar
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 ring-1 ring-red-500/30">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-zinc-400">Carregando...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhum pedido recebido</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-white/10 bg-zinc-900 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">Pedido #{order.id}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                      {ORDER_STATUS[order.status]}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{formatDate(order.createdAt)}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  <Eye size={16} />
                </button>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-zinc-500">Cliente</p>
                  <p className="font-semibold text-white">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Total</p>
                  <p className="font-semibold text-brand-gold">{formatCurrency(order.total)}</p>
                </div>
              </div>

              {NEXT_STATUSES[order.status].length > 0 && (
                <div className="flex gap-2">
                  {NEXT_STATUSES[order.status].map((nextStatus) => (
                    <button
                      key={nextStatus}
                      onClick={() => updateStatus(order.id, nextStatus)}
                      className="flex-1 rounded-lg bg-white/5 py-1.5 text-xs font-bold text-white hover:bg-white/10"
                    >
                      {ORDER_STATUS[nextStatus]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalhes */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-zinc-950 ring-1 ring-white/10">
            <div className="border-b border-white/10 p-4">
              <h2 className="font-display text-lg font-bold text-white">Detalhes do pedido #{selectedOrder.id}</h2>
              <p className="mt-1 text-xs text-zinc-400">{formatDate(selectedOrder.createdAt)}</p>
            </div>

            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-zinc-400">STATUS</p>
                <p className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${STATUS_COLORS[selectedOrder.status]}`}>
                  {ORDER_STATUS[selectedOrder.status]}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-zinc-400">DADOS DO CLIENTE</p>
                <div className="rounded-lg bg-zinc-900 p-3 space-y-1 text-sm">
                  <p><span className="text-zinc-500">Nome:</span> {selectedOrder.customerName}</p>
                  <p><span className="text-zinc-500">Telefone:</span> {selectedOrder.customerPhone}</p>
                  <p><span className="text-zinc-500">Endereço:</span> {selectedOrder.address}</p>
                  {selectedOrder.neighborhood && <p><span className="text-zinc-500">Bairro:</span> {selectedOrder.neighborhood}</p>}
                  {selectedOrder.reference && <p><span className="text-zinc-500">Referência:</span> {selectedOrder.reference}</p>}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-zinc-400">DETALHES DA ENTREGA</p>
                <div className="rounded-lg bg-zinc-900 p-3 space-y-1 text-sm">
                  <p><span className="text-zinc-500">Horário:</span> {selectedOrder.deliverySlot.label}</p>
                  <p><span className="text-zinc-500">Pagamento:</span> {selectedOrder.paymentMethod}</p>
                  {selectedOrder.changeFor && <p><span className="text-zinc-500">Troco para:</span> {formatCurrency(selectedOrder.changeFor)}</p>}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-zinc-400">ITENS</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg bg-zinc-900 p-2 text-sm">
                      <div>
                        <p className="font-semibold text-white">{item.quantity}x {item.product.name}</p>
                        <p className="text-xs text-zinc-400">{formatCurrency(item.unitPrice)} cada</p>
                      </div>
                      <p className="font-bold text-brand-gold">{formatCurrency(item.quantity * item.unitPrice)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl text-brand-gold">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-400">OBSERVAÇÕES</p>
                  <p className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-200">{selectedOrder.notes}</p>
                </div>
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full rounded-lg bg-brand-green py-2 font-bold text-white hover:bg-brand-greenDark"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
