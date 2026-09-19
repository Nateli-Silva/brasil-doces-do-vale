# 🚀 GitHub & Deployment — Brasil Doces do Vale

**Seu projeto está pronto para GitHub e hospedagem!**

---

## 📋 Sumário

- [1. Criar Repositório no GitHub](#1-criar-repositório-no-github)
- [2. Fazer Push do Código](#2-fazer-push-do-código)
- [3. Escolher Hosting](#3-escolher-hosting-4-opções)
- [4. Deploy Automático](#4-deploy-automático)

---

## 1. Criar Repositório no GitHub

### Passo 1: Criar conta (se não tiver)
- Vá para: https://github.com/signup
- Preencha: email, senha, username
- Confirm email

### Passo 2: Criar novo repositório
1. Vá para: https://github.com/new
2. Preencha:
   - **Repository name**: `brasil-doces-do-vale` (ou seu nome)
   - **Description**: `🍫 E-commerce de doces e chocolates com admin panel`
   - **Visibility**: Public (para GitHub Pages funcionar grátis)
   - **Initialize**: NÃO marque "Add README" (você já tem!)
   - Clique: **Create repository**

3. Você verá instruções. **Copie a URL do repositório**:
   ```
   https://github.com/SEU-USERNAME/brasil-doces-do-vale.git
   ```

---

## 2. Fazer Push do Código

### No seu terminal (no PC):

```bash
cd /home/claude/project

# Adicionar repositório remoto
git remote add origin https://github.com/SEU-USERNAME/brasil-doces-do-vale.git

# Renomear branch master → main (padrão GitHub)
git branch -M main

# Fazer push do código
git push -u origin main
```

**Resultado esperado:**
```
Enumerating objects: 67, done.
...
To https://github.com/SEU-USERNAME/brasil-doces-do-vale.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Pronto! Seu código está no GitHub!**

---

## 3. Escolher Hosting (4 Opções)

Você tem **4 opções principais**:

| Opção | Custo | Setup | Melhor Para |
|-------|-------|-------|-----------|
| **Vercel** | Grátis | ⭐⭐ | Frontend + serverless backend |
| **Netlify** | Grátis | ⭐⭐ | Frontend estático |
| **Railway** | Grátis/pago | ⭐⭐⭐ | Full-stack completo (melhor!) |
| **Render** | Grátis | ⭐⭐⭐ | Full-stack completo |

---

### 🥇 OPÇÃO 1: Railway (Recomendado!)

**Melhor para:** Full-stack (frontend + backend + banco de dados)

#### Setup:

1. **Criar conta:**
   - Vá para: https://railway.app
   - Click "Login with GitHub"
   - Autorize Railway

2. **Criar novo projeto:**
   - Click "Create New Project"
   - Select "Deploy from GitHub repo"
   - Autorize GitHub
   - Selecione: `brasil-doces-do-vale`
   - Click "Deploy Now"

3. **Configurar variáveis de ambiente:**
   - Vá em seu projeto → "Variables"
   - Clique "Add Variable"
   - Copie do `backend/.env.example`:
     ```
     PORT=3333
     JWT_SECRET=seu-segredo-super-aleatorio-aqui
     STORE_WHATSAPP_NUMBER=5574813241266
     STORE_PIX_KEY=sua-chave-pix@email.com
     DATABASE_URL=postgresql://... (Railway gera automaticamente)
     CORS_ORIGIN=sua-url-no-railway.com
     ```

4. **Railway vai:**
   - Detectar automaticamente backend + frontend
   - Provisionar PostgreSQL
   - Fazer build e deploy automático
   - Dar URLs para ambos

5. **Resultado:**
   ```
   Backend:  https://seu-projeto-backend.up.railway.app
   Frontend: https://seu-projeto.up.railway.app
   ```

**Documentação:** https://docs.railway.app

---

### 🟦 OPÇÃO 2: Vercel (Frontend Rápido)

**Melhor para:** Frontend estático + API externa

#### Setup:

1. **Criar conta:**
   - Vá para: https://vercel.com
   - Click "Sign up with GitHub"

2. **Import project:**
   - Click "Add New..." → "Project"
   - Selecione seu repositório
   - Clique "Import"

3. **Configurar:**
   - Framework: "Vite"
   - Root Directory: "./frontend"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Clique "Deploy"

4. **Configurar API:**
   - Projeto → Settings → Environment Variables
   - Adicione:
     ```
     VITE_API_URL=https://seu-backend.com
     ```

5. **Resultado:**
   ```
   Frontend: https://seu-projeto.vercel.app
   ```

**Nota:** Você ainda precisa hospedar o backend em outro lugar!

---

### 🌐 OPÇÃO 3: Netlify (Alternativa Frontend)

**Melhor para:** Frontend estático

#### Setup:

1. **Criar conta:**
   - Vá para: https://netlify.com
   - Click "Sign up with GitHub"

2. **New site from Git:**
   - Click "Add new site" → "Import an existing project"
   - Selecione: "GitHub"
   - Selecione seu repositório

3. **Configurar build:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Clique "Deploy"

4. **Environment variables:**
   - Site settings → Build & deploy → Environment
   - Adicione: `VITE_API_URL`

5. **Resultado:**
   ```
   Frontend: https://seu-projeto.netlify.app
   ```

---

### 🟠 OPÇÃO 4: Render (Full-Stack)

**Melhor para:** Full-stack com PostgreSQL

#### Setup:

1. **Criar conta:**
   - Vá para: https://render.com
   - Click "Sign up with GitHub"

2. **Deploy backend:**
   - Click "New+" → "Web Service"
   - Selecione seu repositório
   - Configurar:
     ```
     Environment: Node
     Build Command: cd backend && npm install && npm run build
     Start Command: cd backend && npm start
     Root Directory: ./backend
     ```

3. **Deploy frontend:**
   - Click "New+" → "Static Site"
   - Selecione seu repositório
   - Configurar:
     ```
     Build Command: cd frontend && npm install && npm run build
     Publish Directory: frontend/dist
     ```

4. **Environment Variables (Backend):**
   - Vá em Web Service → Environment
   - Adicione todas as variáveis do `.env.example`

5. **Resultado:**
   ```
   Backend:  https://seu-projeto-backend.onrender.com
   Frontend: https://seu-projeto.onrender.com
   ```

---

## 4. Deploy Automático

Qualquer uma das opções acima **faz deploy automático** quando você faz push para GitHub:

```bash
# No seu PC, após editar código:
git add .
git commit -m "🍫 Nova feature: X"
git push

# Railway/Vercel/Netlify/Render vê o push automaticamente
# e faz novo deploy em 2-5 minutos! 🚀
```

---

## 📊 Comparação Rápida

### Railway ⭐ (Recomendado)

**Pros:**
- ✅ Full-stack em um lugar
- ✅ PostgreSQL incluído
- ✅ Deploy 1-click
- ✅ Free tier generoso

**Contras:**
- Pode ser mais caro para tráfego muito alto

**Preço:**
- Grátis: $5/mês de crédito
- Uso padrão: ~$0/mês (dentro do free tier)

---

### Vercel

**Pros:**
- ✅ Muito rápido
- ✅ Interface bonita
- ✅ Integração perfeita Next.js/Vite

**Contras:**
- ❌ Só frontend
- ❌ Precisa backend em outro lugar

**Preço:**
- Grátis para frontend
- Serverless functions grátis (limitadas)

---

### Netlify

**Pros:**
- ✅ Deploy fácil
- ✅ Grátis
- ✅ Bom para estático

**Contras:**
- ❌ Só frontend
- ❌ Precisa backend em outro lugar

**Preço:**
- Completamente grátis

---

### Render

**Pros:**
- ✅ Full-stack
- ✅ Migração fácil de Heroku
- ✅ Boa interface

**Contras:**
- Mais lento que Railway
- Sleep mode no free tier (acorda em 30s)

**Preço:**
- Grátis: service dorme sem uso
- Pago: ~$7-15/mês

---

## 🎯 Recomendação

### Para você (Brasil Doces do Vale):

**Use: Railway** 🥇

Por quê:
- ✅ Full-stack (backend + frontend juntos)
- ✅ PostgreSQL automático (melhor que SQLite)
- ✅ Variáveis de ambiente seguras
- ✅ Deploy 1-click
- ✅ Free tier funciona bem
- ✅ Suporte a WhatsApp API

---

## 📝 Passo a Passo Railway (Completo)

### 1. Preparar GitHub

```bash
cd /home/claude/project
git remote add origin https://github.com/SEU-USERNAME/brasil-doces-do-vale.git
git branch -M main
git push -u origin main
```

### 2. Entrar no Railway

- Vá para: https://railway.app
- Click "Login with GitHub"
- Autorize Railway

### 3. Criar Projeto

- Click "Create New Project"
- Select "Deploy from GitHub repo"
- Autorize GitHub
- Selecione: `brasil-doces-do-vale`

### 4. Configurar Variáveis

No painel do Railway, vá em "Variables" e adicione:

```
JWT_SECRET=sua-chave-secreta-aleatoria-muito-longa-!!!
STORE_WHATSAPP_NUMBER=5574813241266
STORE_PIX_KEY=sua-chave@email.com
CORS_ORIGIN=https://seu-projeto.up.railway.app
```

### 5. Esperar Deploy

Railway vai:
1. Detectar backend (Node.js)
2. Detectar frontend (Vite)
3. Provisionar PostgreSQL
4. Build automático
5. Deploy automático

**Tempo total: 3-5 minutos**

### 6. Acessar seu site

```
Frontend: https://seu-projeto.up.railway.app
Admin:    https://seu-projeto.up.railway.app/admin/login
API:      https://seu-projeto-api.up.railway.app/api
```

---

## 🔐 Segurança em Produção

### Antes de fazer deploy, atualize:

**1. JWT Secret (Super importante!)**
```bash
# Gerar nova senha aleatória
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie a saída e coloque em: `JWT_SECRET`

**2. Chave Pix Real**
- Substitua `STORE_PIX_KEY` com sua chave real

**3. Número WhatsApp Real**
- Já está correto: `5574813241266`

**4. CORS_ORIGIN**
- Use a URL do Railway/Vercel/seu domínio real

---

## 📱 Testar em Produção

Depois de fazer deploy:

1. **Acesse o site:**
   ```
   https://seu-projeto.up.railway.app
   ```

2. **Teste a vitrine:**
   - Adicione produto ao carrinho
   - Finalize pedido
   - Teste checkout → WhatsApp

3. **Teste admin:**
   ```
   https://seu-projeto.up.railway.app/admin/login
   user: admin
   pass: brasil2024
   ```
   - Adicione novo produto
   - Veja em tempo real na vitrine!

4. **Veja logs:**
   - Railway → seu projeto → "Logs"
   - Veja requisições em tempo real

---

## 🚨 Troubleshooting Produção

### "Página em branco"
- Verificar logs no Railway
- VITE_API_URL está configurado?
- Backend está rodando?

### "Admin não funciona"
- JWT_SECRET foi definido?
- Banco de dados foi criado?
- Permissões corretas?

### "Checkout não funciona"
- STORE_WHATSAPP_NUMBER está correto?
- CORS_ORIGIN está configurado?
- Check logs do backend

### "Banco vazio"
- Fazer seed no Railway:
  ```bash
  railway run npm run prisma:seed
  ```

---

## 🔄 Atualizar Código

Cada vez que você faz push:

```bash
# No seu PC
git add .
git commit -m "🍫 Nova feature"
git push origin main
```

Railway detecta automaticamente e:
1. Faz novo build
2. Roda migrações
3. Faz deploy
4. Atualiza seu site

**Tempo: 2-5 minutos**

---

## 💰 Custo Estimado

### Railway (Recomendado)

- **Free tier:** $5/mês de crédito
- **Seu uso típico:** ~$2-3/mês
  - Frontend: ~$0 (estático)
  - Backend: ~$2/mês
  - PostgreSQL: ~$1/mês

**Total: Gratuito! (dentro do free tier)**

### Quando fica pago:
- Se tiver muito tráfego (>1000 pedidos/dia)
- Então pague: $10-20/mês

---

## 📚 Próximas Steps

1. ✅ Criar repositório GitHub
2. ✅ Fazer push do código
3. ⏭️ **Escolher plataforma de hosting** (Railway recomendado)
4. ⏭️ Configurar variáveis de ambiente
5. ⏭️ Fazer primeiro deploy
6. ⏭️ Testar site ao vivo
7. ⏭️ Compartilhar URL com clientes!

---

## 🎯 Quick Links

**GitHub:**
- Criar repo: https://github.com/new
- Seu projeto: https://github.com/SEU-USERNAME/brasil-doces-do-vale

**Hosting:**
- Railway: https://railway.app (⭐ Recomendado)
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Render: https://render.com

**Documentação:**
- Railway docs: https://docs.railway.app
- Vite build: https://vitejs.dev/guide/build.html
- Express deployment: https://expressjs.com/en/advanced/best-practice-performance.html

---

## ✨ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código feito push (git push origin main)
- [ ] Conta criada em Railway
- [ ] Projeto importado do GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Build completado (sem erros)
- [ ] Site acessível online
- [ ] Admin funcionando
- [ ] Checkout testado
- [ ] URL compartilhada com clientes

---

**Seu site estará online em 15 minutos!** 🚀

Desenvolvido com ❤️ para Brasil Doces do Vale
Setembro 2026
