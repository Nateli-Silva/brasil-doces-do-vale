import { useEffect, useState, FormEvent } from "react";
import { Edit2, Trash2, Plus, X, Clock } from "lucide-react";
import { DeliverySlot } from "../../types";
import { deliverySlotsApi } from "../../api/deliverySlots";

interface SlotFormData {
  label: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  active: boolean;
}

export function DeliverySlotsPage() {
  const [slots, setSlots] = useState<DeliverySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<DeliverySlot | null>(null);
  const [formData, setFormData] = useState<SlotFormData>({
    label: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    active: true,
  });

  useEffect(() => {
    loadSlots();
  }, []);

  async function loadSlots() {
    setLoading(true);
    setError(null);
    try {
      const data = await deliverySlotsApi.listAdmin();
      setSlots(data);
    } catch {
      setError("Falha ao carregar horários");
    } finally {
      setLoading(false);
    }
  }

  function openForm(slot?: DeliverySlot) {
    if (slot) {
      setEditing(slot);
      setFormData({
        label: slot.label,
        dayOfWeek: slot.dayOfWeek || "",
        startTime: slot.startTime,
        endTime: slot.endTime,
        active: slot.active,
      });
    } else {
      setEditing(null);
      setFormData({
        label: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
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
        label: formData.label,
        dayOfWeek: formData.dayOfWeek,
        startTime: formData.startTime,
        endTime: formData.endTime,
        active: formData.active,
      };

      if (editing) {
        await deliverySlotsApi.update(editing.id, payload);
      } else {
        await deliverySlotsApi.create(payload);
      }

      loadSlots();
      closeForm();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao salvar horário");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que quer excluir este horário?")) return;

    try {
      await deliverySlotsApi.remove(id);
      loadSlots();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao excluir horário");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">Configure os horários de entrega disponíveis para os clientes</p>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-bold text-white hover:bg-brand-greenDark"
        >
          <Plus size={16} /> Novo horário
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 ring-1 ring-red-500/30">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-zinc-400">Carregando...</p>
      ) : slots.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhum horário cadastrado</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot) => (
            <div key={slot.id} className="rounded-lg border border-white/10 bg-zinc-900 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} className="text-brand-gold" />
                    <p className="font-semibold text-white">{slot.label}</p>
                  </div>
                  <p className="text-xs text-zinc-400">{slot.dayOfWeek}</p>
                  <p className="mt-2 text-sm text-brand-green">{slot.startTime} - {slot.endTime}</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      slot.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {slot.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openForm(slot)}
                    className="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="rounded p-1 text-zinc-400 hover:bg-red-500/20 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal do formulário */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-zinc-950 ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="font-display text-lg font-bold text-white">
                {editing ? "Editar horário" : "Novo horário"}
              </h2>
              <button onClick={closeForm} className="rounded-full p-1 text-zinc-400 hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Rótulo (ex: Quinta-feira, 08:00 - 12:00)</label>
                <input
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Dia da semana (opcional)</label>
                <input
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                  placeholder="Quinta-feira"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-400">Hora de início (HH:MM)</label>
                  <input
                    required
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-400">Hora de término (HH:MM)</label>
                  <input
                    required
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                Ativo
              </label>

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
