# 📱 Brasil Doces do Vale — Celular & Sem Notebook

**TL;DR:** 3 formas rápidas de usar tudo pelo celular ⚡

---

## 🎯 Resumo das Opções

```
┌─────────────────────────────────────────────────────────────────┐
│  SEM NGROK (Mesma rede WiFi)      │  COM NGROK (De qualquer lugar)  │
├──────────────────────────────────┼──────────────────────────────────┤
│                                  │                                  │
│  Vitrine:                        │  Vitrine:                        │
│  http://192.168.1.100:5173       │  https://abc123.ngrok.io         │
│                                  │                                  │
│  Admin:                          │  Admin:                          │
│  http://192.168.1.100:5173/admin │  https://abc123.ngrok.io/admin   │
│                                  │                                  │
│  Editor:                         │  Editor:                         │
│  http://192.168.1.100:5173/editor│  https://abc123.ngrok.io/editor  │
│                                  │                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 3 Formas Rápidas

### **1️⃣ Editar Produtos (Melhor jeito!)**

```
Admin Panel → Gerenciador de Produtos

Sem editar código
Muda em tempo real
Fácil pelo celular
```

**Como:**
1. Acesse: `/admin/login` (admin / brasil2024)
2. Clique "Produtos" 
3. "Novo produto" ou edite existente
4. Salve — aparece na vitrine!

---

### **2️⃣ Ver o Site Funcionando**

```
Terminal: ./ngrok http 3333
Celular:  https://abc123.ngrok.io

Testa vitrine completa
Testa checkout
Abre WhatsApp com pedido
```

---

### **3️⃣ Editar Código (Se precisar)**

```
Editor Web: /editor.html

Seleciona pasta
Abre arquivo
Edita online
Salva no cache
```

---

## 🚀 Quick Start (Copie e Cole)

### Terminal 1: Backend
```bash
cd backend && npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend && npm run dev
```

### Terminal 3: Ngrok
```bash
./ngrok http 3333
# Copia a URL: https://abc123.ngrok.io
```

### No Celular:
```
https://abc123.ngrok.io
https://abc123.ngrok.io/admin/login (admin / brasil2024)
https://abc123.ngrok.io/editor.html
```

---

## 📋 Tarefas + Ferramentas

| Tarefa | Ferramenta | Dificuldade |
|--------|-----------|------------|
| Ver site | Ngrok | ⭐ |
| Editar produtos | Admin Panel | ⭐ |
| Editar horários | Admin Panel | ⭐ |
| Ver pedidos | Admin Panel | ⭐ |
| Mudar cores | Editor Web / Config | ⭐⭐ |
| Editar código | Editor Web | ⭐⭐⭐ |

---

## 🎨 Customizações Comuns

### ✏️ Mudar Cores (Mais fácil)

Arquivo: `frontend/tailwind.config.js`

```js
green: "#00A859"       // mude para outra cor
greenDark: "#005C2E"   // ou aqui
gold: "#FACC15"        // ou aqui
```

Reload: ⟳ na página

### 📦 Adicionar Produto (Sem código!)

Admin → "Produtos" → "Novo"

Preenche:
- Nome
- Preço  
- Descrição
- Categoria
- Ativa?

Clica "Salvar" → Aparece na vitrine!

### 🕐 Novo Horário (Sem código!)

Admin → "Horários" → "Novo"

Preenche:
- Label (ex: "Quinta-feira, 08:00 - 12:00")
- Dia da semana
- Hora início
- Hora fim
- Ativo?

Clica "Salvar" → Cliente vê na entrega!

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Página não carrega" | Ngrok rodando? Ctrl+C para e rode novamente |
| "Admin em branco" | Reload (⟳) e tenta login novamente |
| "URL não abre" | https (com s)? Não é http |
| "Editor não salva" | Normal - usa localStorage, salva auto |
| "Cores não mudam" | Reload a página + espera 2s |

---

## 💡 Dica Profissional

**A forma mais prática de customizar = Admin Panel**

```
❌ Editar código (complexo, erro fácil)
✅ Admin Panel (simples, sem risco)
```

Tudo que você precisa (produtos, horários, pedidos) 
está no Admin Panel — use!

---

## 📚 Documentação

| Doc | Para quê |
|-----|----------|
| `QUICK_START.md` | Setup em 5 min |
| `MOBILE_GUIDE.md` | Guia completo celular |
| `README.md` | Documentação total |
| `MOBILE_CHEATSHEET.txt` | Copiar/colar rápido |

---

## ✨ Checklist: Pronto?

- [ ] Ngrok instalado
- [ ] Backend rodando
- [ ] Frontend rodando
- [ ] Ngrok abrindo URL
- [ ] Acesso no celular
- [ ] Admin login OK
- [ ] Vitrine visível
- [ ] Editor carregando

---

**Pronto!** Você já pode fazer tudo pelo celular 🎉

Comece pelo Admin Panel (mais fácil) — sem código necessário!
