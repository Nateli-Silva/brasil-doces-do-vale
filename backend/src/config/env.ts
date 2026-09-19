import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3333),
  jwtSecret: required("JWT_SECRET", "dev-secret-troque-em-producao"),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  storeWhatsappNumber: required("STORE_WHATSAPP_NUMBER", "5574999999999"),
  storePixKey: process.env.STORE_PIX_KEY ?? "",
  storePixName: process.env.STORE_PIX_NAME ?? "Brasil Doces do Vale",
};
