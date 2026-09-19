import { create } from "zustand";
import { AdminUser } from "../types";

const TOKEN_KEY = "bdv_admin_token";

interface AuthState {
  token: string | null;
  admin: AdminUser | null;
  setSession: (token: string, admin: AdminUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  admin: null,

  setSession: (token, admin) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token, admin });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, admin: null });
  },
}));
