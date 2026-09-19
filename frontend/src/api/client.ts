import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Anexa o token do admin (se existir) em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bdv_admin_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
