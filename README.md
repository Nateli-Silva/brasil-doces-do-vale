# 🍫 Brasil Doces do Vale — Sistema de Encomendas Online

**Uma aplicação web profissional, moderna e responsiva para a loja Brasil Doces do Vale (Juazeiro - BA)**, especializada em doces artesanais: trufas, cones, brigadeiros, alfajores.

**Stack**: Node.js + Express + TypeScript + Prisma + React + Vite + Tailwind CSS  
**Arquitetura**: MVC com separação clara entre backend e frontend  
**Design**: Identidade visual da marca (verde/dourado), tema escuro elegante, totalmente responsivo

---

## ✨ Características principais

### 👤 **Área do Cliente**
- 🎨 Vitrine interativa com carrossel de promoções (Swiper)
- 🛒 Filtro por categorias (Trufas, Cones, Brigadeiros, Alfajores, Combos, Revenda)
- 🛍️ Carrinho persistente com controle de quantidade
- 📅 **Agendamento de horário de entrega** (select obrigatório, dados gerenciados pelo admin)
- 💳 **Pagamento restrito** a apenas 3 opções:
  - **Pix** (chave exibida no checkout)
  - **Dinheiro na entrega** (com opção de troco)
  - **Cartão na entrega**
- 📲 **Checkout via WhatsApp** — pedido formatado automaticamente + link wa.me
- ✅ Validação de preços **100% no servidor** (cliente não pode alterar valores)

### 🛡️ **Área Administrativa (Painel Admin)**
- 🔐 Login JWT protegido
- 📦 **Gerenciador de Produtos**
  - CRUD completo (criar, editar, excluir doces)
  - Definir categoria, preço, descrição, destaques (featured)
  - Status ativo/inativo
- 🕐 **Gestão de Horários de Entrega**
  - CRUD dos turnos disponíveis
  - Integração direta com o `<select>` do checkout
- 📋 **Painel de Pedidos**
  - Visualizar todos os pedidos recebidos
  - Atualizar status (Pendente → Confirmado → Em preparo → Saiu para entrega → Entregue)
  - Detalhes completos: cliente, endereço, itens, valor, método de pagamento

---

## 🚀 Setup Rápido

### **Pré-requisitos**
- Node.js 18+ e npm (ou yarn/pnpm)
- Git (opcional, para versionamento)

### **1. Clonar / Extrair o projeto**
```bash
cd brasil-doces-do-vale
```

### **2. Setup do Backend**
```bash
cd backend

# Instalar dependências
npm install

# Copiar o .env.example e configurar (opcional, padrões já vêm preenchidos)
cp .env.example .env

# Gerar cliente Prisma
npm run prisma:generate

# Criar/atualizar banco de dados SQLite
npm run prisma:push

# Popular com dados de seed (admin padrão, horários, produtos)
npm run seed

# Iniciar servidor (dev mode com hot reload)
npm run dev
```

**Resultado esperado:**
```
🍫 Brasil Doces do Vale API rodando em http://localhost:3333
```

### **3. Setup do Frontend (novo terminal)**
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar dev server (Vite)
npm run dev
```

**Resultado esperado:**
```
➜  Local:   http://localhost:5173
```

---

## 📖 Como usar

### **Como cliente:**
1. Abra http://localhost:5173
2. Navegue pelo catálogo (carousel + filtro de categorias)
3. Adicione produtos ao carrinho
4. Clique em "Carrinho" → "Finalizar pedido"
5. Preencha dados pessoais, **selecione um horário de entrega obrigatório**
6. Escolha a forma de pagamento (Pix, Dinheiro ou Cartão)
7. Clique em "Enviar pedido pelo WhatsApp"
8. Será aberto o WhatsApp com o pedido formatado pronto para enviar

### **Como administrador:**
1. Abra http://localhost:5173/admin/login
2. Faça login com:
   - **Usuário**: `admin`
   - **Senha**: `brasil2024`
3. **Gerenciar Produtos**: CRUD completo de doces, preços, categorias
4. **Horários de Entrega**: configure os turnos que os clientes vão ver no checkout
5. **Painel de Pedidos**: veja todos os pedidos recebidos + atualize status

---

## 📦 Estrutura do Projeto

```
brasil-doces-do-vale/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma         # Definição dos modelos (Product, Order, etc)
│   │   └── seed.ts               # Script de população inicial
│   ├── src/
│   │   ├── config/               # Env, Prisma client
│   │   ├── controllers/          # Lógica de negócio (CRUD)
│   │   ├── routes/               # Rotas Express
│   │   ├── middleware/           # JWT auth, error handler
│   │   ├── services/             # Formatação WhatsApp
│   │   ├── types/                # DTOs TypeScript
│   │   ├── app.ts                # App Express configurada
│   │   └── server.ts             # Bootstrap
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── logo.png              # Logo da marca
│   ├── src/
│   │   ├── api/                  # Axios client + endpoints
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PromoCarousel.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CheckoutModal.tsx
│   │   ├── views/
│   │   │   ├── client/
│   │   │   │   └── HomePage.tsx
│   │   │   └── admin/
│   │   │       ├── LoginPage.tsx
│   │   │       ├── AdminLayout.tsx
│   │   │       ├── ProductsPage.tsx
│   │   │       ├── DeliverySlotsPage.tsx
│   │   │       └── OrdersPage.tsx
│   │   ├── store/                # Zustand: cart, auth
│   │   ├── types/                # TypeScript interfaces
│   │   ├── App.tsx               # Router principal
│   │   ├── main.tsx              # React entry point
│   │   └── index.css             # Tailwind + custom styles
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## 🔑 Variáveis de ambiente

### Backend (`.env`)
```env
DATABASE_URL="file:./dev.db"          # SQLite local (padrão)
PORT=3333                              # Porta da API
JWT_SECRET="troque-em-producao"       # Segredo JWT (troque!)
STORE_WHATSAPP_NUMBER="5574813241266" # Número da loja (DDI + DDD + número, sem símbolos)
STORE_PIX_KEY="74991234567"           # Chave Pix da loja
STORE_PIX_NAME="Brasil Doces do Vale"
CORS_ORIGIN="http://localhost:5173"   # URL do frontend
```

### Frontend (`.env` — opcional, Vite já padrão para localhost:3333)
```env
VITE_API_URL="http://localhost:3333"
```

---

## 🗄️ Banco de Dados (Prisma)

### Modelos principais
- **Product**: doces (nome, preço, categoria, descrição, imagem, featured, ativo)
- **DeliverySlot**: horários de entrega (label, startTime, endTime, ativo)
- **Order**: pedidos (cliente, endereço, itens, pagamento, status)
- **OrderItem**: itens de um pedido (produto, quantidade, preço unitário)
- **Admin**: usuários administrativos (username, password hash)

### Seed inicial
Ao rodar `npm run seed`, você obtém:
- ✅ Admin padrão: `admin` / `brasil2024`
- ✅ 4 horários de entrega pré-configurados
- ✅ 6 produtos de exemplo (trufas, brigadeiros, cones, alfajores, combos)

### Mudar para PostgreSQL (produção)
```prisma
// Em backend/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/brasil_doces"
npm run prisma:push
```

---

## 🎨 Paleta de cores & Design

- **Verde Brasil**: `#00A859` (primária, CTAs, destaque)
- **Verde Escuro**: `#005C2E` (backgrounds, texto frio)
- **Dourado/Amarelo**: `#FACC15` (preços, ênfase)
- **Fundo**: `#09090b` (Zinc-950, tema escuro elegante)
- **Fontes**: Poppins (Google Fonts) para display, system-ui padrão

**Componentes**: Tailwind CSS v3+ + Lucide React (ícones)

---

## 🚢 Deploy

### Backend (Render, Railway, Heroku)
```bash
# 1. Gerar build
npm run build

# 2. Definir variáveis de ambiente em produção:
#    DATABASE_URL (PostgreSQL)
#    JWT_SECRET (gerar um novo, seguro)
#    CORS_ORIGIN (URL do frontend em produção)
#    etc.

# 3. Comando de start
npm start
```

### Frontend (Vercel, Netlify, GitHub Pages)
```bash
# Build estático
npm run build

# Deploy a pasta `dist/` para seu host
```

### Setup de domínio & HTTPS
- Frontend: hospede em Vercel, Netlify (automático HTTPS)
- Backend: configure CORS para o domínio do frontend
- Email: considere SES (AWS) ou SendGrid para notificações futuras

---

## 📱 Responsividade

A aplicação é **100% responsiva**:
- ✅ Mobile-first design
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- ✅ Toque & clique otimizados
- ✅ Scrolling suave em listagens longas

---

## 🔐 Segurança

- ✅ **JWT**: tokens com expiração 12h
- ✅ **Validação de servidor**: preços sempre validados no backend
- ✅ **CORS**: configurado para origem específica
- ✅ **Bcrypt**: senhas hasheadas (não plain text)
- ✅ **Validação Zod**: schemas para entrada/saída

---

## 🛠️ Scripts úteis

### Backend
```bash
npm run dev              # Iniciar em modo desenvolvimento
npm run build            # Compilar TypeScript
npm start                # Rodar build compilado
npm run prisma:studio    # Abrir Prisma Studio (GUI do banco)
npm run seed             # Popular dados iniciais
```

### Frontend
```bash
npm run dev              # Iniciar em modo desenvolvimento
npm run build            # Build para produção (dist/)
npm run preview          # Pré-visualizar build localmente
```

---

## 🐛 Troubleshooting

### "Erro de conexão com banco de dados"
```bash
# Verifique se DATABASE_URL está correto em .env
# Para SQLite local:
DATABASE_URL="file:./dev.db"

# Recrie o banco:
rm prisma/dev.db
npm run prisma:push
npm run seed
```

### "CORS error quando frontend chama API"
```bash
# Verifique CORS_ORIGIN em .env do backend
CORS_ORIGIN="http://localhost:5173"  # (dev)
# em produção, troque para seu domínio real
```

### "Token expirado no painel admin"
- Faça logout e login novamente
- Tokens JWT expiram em 12h por padrão (configure em `authController.ts` se precisar)

### "WhatsApp link não abre"
- Verifique `STORE_WHATSAPP_NUMBER` (deve ser `5574813241266`, sem símbolos)
- Teste o link wa.me diretamente: `https://wa.me/5574813241266?text=Teste`

---

## 📞 Contato & Suporte

**Brasil Doces do Vale**  
📍 Juazeiro - BA, Brasil  
📱 +55 74 8132-4126  
📷 @brasildocesdovale (Instagram)

---

## 📄 Licença

Desenvolvido com ❤️ para Brasil Doces do Vale.  
Propriedade intelectual reservada.

---

## 🎯 Roadmap Futuro

- [ ] Integração com Stripe/PagSeguro para Pix online
- [ ] SMS/Email de confirmação de pedido
- [ ] Histórico de pedidos no painel do cliente
- [ ] Cupons e desconto
- [ ] App mobile (React Native)
- [ ] Integração com Movidesk/Zendesk para suporte
- [ ] Analytics e dashboard de vendas
- [ ] WhatsApp Official Business API (em vez de link wa.me)

---

**Versão**: 1.0.0  
**Data**: Setembro 2026  
**Stack**: Node + Express + TypeScript + Prisma + React + Vite + Tailwind CSS
