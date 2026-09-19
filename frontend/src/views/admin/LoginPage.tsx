import { FormEvent, useState } from "react";
import { Lock, LogIn } from "lucide-react";
import logo from "../../assets/logo.png";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setSession = useAuthStore((s) => s.setSession);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, admin } = await authApi.login(username, password);
      setSession(token, admin);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Falha na autenticação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-brand-greenDark/20 to-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-zinc-900 p-8 ring-1 ring-white/10 shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <img src={logo} alt="Brasil Doces do Vale" className="h-20 w-20 rounded-full ring-2 ring-brand-gold" />
          <h1 className="font-display text-2xl font-bold text-white">Painel Admin</h1>
          <p className="text-xs font-medium text-brand-gold">Brasil Doces do Vale</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">Usuário</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-white ring-1 ring-white/10 focus:outline-none focus:ring-brand-green"
              placeholder="Sua senha"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 ring-1 ring-red-500/30">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-green py-3 font-bold text-white shadow-glow transition hover:bg-brand-greenDark disabled:opacity-60"
          >
            <LogIn size={18} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Painel administrativo — acesso restrito a colaboradores autorizados.
        </p>
      </div>
    </div>
  );
}
