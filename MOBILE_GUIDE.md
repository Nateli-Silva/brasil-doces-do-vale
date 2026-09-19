# 📱 Guia Completo: Acessar e Editar via Celular

**Sem notebook? Sem problema!** Acesse tudo pelo celular com essas técnicas.

---

## 🌐 Opção 1: Ngrok (Visualizar o Site)

**Ngrok expõe seu servidor local para a internet** — acessível de qualquer lugar.

### Setup (no PC/Mac/Linux uma única vez)

```bash
# 1. Baixe ngrok em: https://ngrok.com/download
# 2. Descompacte na pasta do projeto

# 3. Abra o terminal e rode (com backend rodando em porta 3333):
./ngrok http 3333
```

**Resultado esperado:**
```
Session Status                online
Account                       xxxxx
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3333
```

### ✅ No Celular

1. Abra o navegador e acesse: **`https://abc123.ngrok.io`**
2. Veja seu site funcionando 100%!
3. A URL funciona de qualquer internet (4G, WiFi, etc)

---

## 📝 Opção 2: Editor Web (Editar Código)

Criei um **editor de código web-based** que funciona no celular.

### Como Usar

1. **Certifique-se que o frontend está rodando:**
   ```bash
   cd frontend
   npm run dev
   # Deve estar em http://localhost:5173
   ```

2. **No celular, acesse:**
   - Local (mesma rede): `http://seu-ip-pc:5173/editor.html`
   - Internet (ngrok): `https://abc123.ngrok.io/editor.html`

3. **No editor:**
   - Selecione uma pasta (Frontend ou Backend)
   - Clique no arquivo para abrir
   - Edite o código
   - Salva automaticamente no navegador (localStorage)

**Arquivos disponíveis:**
- Frontend: App.tsx, main.tsx, index.css, componentes, páginas
- Backend: server.ts, app.ts, controllers, rotas

---

## 🖥️ Opção 3: Admin Panel (Customizar sem Código)

A melhor forma é **editar pelo painel admin** — sem tocar em código!

### Dados que Você Pode Mudar

**Sem sair da aplicação:**

✅ **Adicionar/Editar Produtos** (nome, preço, categoria, descrição)  
✅ **Configurar Horários de Entrega** (criar novos turnos)  
✅ **Gerenciar Pedidos** (ver status, atualizar)  

### Como Acessar

1. Acesse: **`https://abc123.ngrok.io/admin/login`** (via ngrok no celular)
2. Faça login:
   - Usuário: `admin`
   - Senha: `brasil2024`
3. Customize tudo pelo painel!

---

## 🎨 Opção 4: Editar Cores (Rápido)

Para mudar as cores da marca **sem código**, edite este arquivo:

**`frontend/tailwind.config.js`**

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        green: "#00A859",       // ← mude para outra cor
        greenDark: "#005C2E",   // ← ou aqui
        gold: "#FACC15",        // ← ou aqui
      },
    },
  },
},
```

**Depois reload no celular** e as cores mudam em tempo real!

---

## 📱 Acessar Tudo pelo Celular (Resumo)

### **Na mesma rede (WiFi local)**

```
Seu IP do PC: 192.168.1.100 (descubra com: ipconfig ou ifconfig)

Vitrine:     http://192.168.1.100:5173
Admin:       http://192.168.1.100:5173/admin/login
API:         http://192.168.1.100:3333/api/products
Editor:      http://192.168.1.100:5173/editor.html
```

### **De qualquer lugar (Internet)**

```
Use ngrok (expõe sua máquina para internet):

Vitrine:     https://abc123.ngrok.io
Admin:       https://abc123.ngrok.io/admin/login
API:         https://abc123.ngrok.io/api/products
Editor:      https://abc123.ngrok.io/editor.html
```

---

## 🚀 Guia Rápido: Do Zero ao Celular

### Pré-requisito

Seu PC/Mac rodando:
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Terminal 3 (ngrok)
./ngrok http 3333
```

### Passo a Passo

1. **Abra ngrok** (ver URL: `https://abc123.ngrok.io`)
2. **No celular**, acesse:
   - **Visualizar site**: `https://abc123.ngrok.io`
   - **Painel admin**: `https://abc123.ngrok.io/admin/login`
   - **Editor código**: `https://abc123.ngrok.io/editor.html`
3. **Customize** via admin panel (melhor jeito)
4. **Edite código** via editor web se precisar
5. **Reload** a página para ver mudanças

---

## 💡 Dicas Importantes

### Ngrok Grátis vs Pago

**Grátis (funciona bem):**
- URL muda a cada vez que reinicia
- Limite de requisições (mas é bastante)
- Perfeito para testes

**Pago ($5/mês):**
- URL fixa (mesma sempre)
- Sem limite
- Bom para usar em produção temporária

### Problemas Comuns

**"Não consigo acessar a URL do ngrok"**
- Verifique se o terminal do ngrok ainda está rodando
- Copie a URL exata (https, não http)

**"Editor web não salva"**
- É normal — usa localStorage (cache local)
- Salva automaticamente, restaura ao abrir novamente

**"Cores não mudam"**
- Reload a página no celular (F5 ou ⟳)
- Espere 2s para Tailwind recompilar

---

## 🔧 Ferramentas Recomendadas para Celular

### Navegadores Mobile
- **Chrome** — melhor para debug
- **Firefox** — boa alternativa
- **Safari** (iOS) — funciona bem

### Git pelo Celular
- **GitHub Desktop** (desktop only, mas você pode usar pelo celular)
- **GitKraken** (app mobile)
- **App GitHub oficial** (para clonar, pull, push)

### Editores Online Alternativos
- **GitHub Web Editor** (github.dev)
- **Gitpod** (IDE online completa)
- **Replit** (coding online)

---

## 📋 Checklist: Acessar pelo Celular

- [ ] Ngrok instalado e rodando
- [ ] Backend rodando (terminal 1)
- [ ] Frontend rodando (terminal 2)
- [ ] Copiei a URL do ngrok
- [ ] Acessei a URL no celular
- [ ] Consegui fazer login no admin
- [ ] Consegui visualizar a vitrine
- [ ] Consegui editar um produto

---

## 🎯 Tarefas Comuns pelo Celular

### Adicionar Novo Produto
1. Acesse admin (`/admin/login`)
2. Vá em "Gerenciador de Produtos"
3. Clique "Novo produto"
4. Preencha dados e salve
5. Aparece na vitrine em tempo real!

### Mudar Horários de Entrega
1. Admin → "Horários de Entrega"
2. Clique "Novo horário"
3. Defina dia, hora início e fim
4. Clientes verão o novo horário no checkout!

### Testar o Checkout
1. Acesse a vitrine
2. Adicione produtos ao carrinho
3. Clique "Finalizar pedido"
4. **IMPORTANTE**: Selecione o horário (é obrigatório!)
5. Escolha pagamento (Pix, Dinheiro ou Cartão)
6. Clique "Enviar pelo WhatsApp"
7. Abrirá WhatsApp com o pedido formatado!

---

## 🌍 Compartilhar a URL (com Clientes)

Quer deixar clientes acessarem?

```bash
# No ngrok, copie a URL:
https://abc123.ngrok.io

# Compartilhe:
- WhatsApp: "Clique aqui para fazer pedidos: https://abc123.ngrok.io"
- Instagram: Cole no bio
- Email: Envie o link

# Clientes acessam e fazem pedidos via WhatsApp!
```

---

## ⚡ Quando Usar Cada Opção

| Situação | Use |
|----------|-----|
| Ver o site funcionando | Ngrok |
| Editar produtos/horários | Admin Panel |
| Customizar cores/texto | Tailwind config |
| Editar código | Editor Web |
| Compartilhar com clientes | Ngrok URL |

---

## 📞 Precisa de Mais Ajuda?

1. Leia **QUICK_START.md** para setup inicial
2. Leia **README.md** para documentação completa
3. Leia **BUILD_SUMMARY.md** para detalhes técnicos

---

**Dica de Ouro:** 🏆

A melhor forma de customizar é pelo **Admin Panel** (no celular).
Não precisa de código — tudo visual e fácil!

Bom trabalho! 🚀
