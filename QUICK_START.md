# ⚡ Quick Start — Brasil Doces do Vale

Comece em **menos de 5 minutos**!

## Terminal 1: Backend
```bash
cd backend
npm install
npm run prisma:push
npm run seed
npm run dev
```
✅ API rodando em `http://localhost:3333`

## Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Vitrine rodando em `http://localhost:5173`

## 🎯 Acessar

**Cliente (vitrine):**  
→ http://localhost:5173

**Admin (painel):**  
→ http://localhost:5173/admin/login  
• Usuário: `admin`  
• Senha: `brasil2024`

---

## 💡 Primeiros passos

1. **Cliente**: Adicione produtos ao carrinho, teste o checkout (abre WhatsApp)
2. **Admin**: 
   - Crie 1-2 novos produtos em "Produtos"
   - Gerencie horários de entrega em "Horários de entrega"
   - Veja os pedidos em "Painel de Pedidos" (se algum foi submetido)

---

## 🚀 Deploy rápido

**Backend** (Render.com / Railway.app):
```bash
git push heroku main
```

**Frontend** (Vercel / Netlify):
```bash
npm run build
# Deploy pasta `dist/`
```

---

**Mais detalhes?** Veja `README.md` 📖
