# 🚀 Setup GitHub para Nateli-Silva

**Seu repositório Git local está 100% pronto!**
**Agora vamos colocar no GitHub na sua conta.**

---

## ⚡ Quick Start (3 Passos)

### Passo 1: Criar Repositório no GitHub (Sua Conta)

1. Abra GitHub no celular/PC: https://github.com/Nateli-Silva
2. Clique no ➕ (canto superior direito)
3. Selecione: **New repository**
4. Preencha:
   ```
   Repository name: brasil-doces-do-vale
   Description: 🍫 E-commerce de doces e chocolates com admin panel
   Visibility: Public ✅
   ```
5. **NÃO marque**:
   - Add a README file
   - Add .gitignore
   - Add a license
   
   (Você já tem tudo isso!)

6. Clique: **Create repository**

7. GitHub mostrará uma página com instruções. **Copie esta URL**:
   ```
   https://github.com/Nateli-Silva/brasil-doces-do-vale.git
   ```

---

### Passo 2: Fazer Push do Código (No Terminal)

Abra o terminal/cmd e execute:

```bash
cd /home/claude/project

git remote add origin https://github.com/Nateli-Silva/brasil-doces-do-vale.git

git branch -M main

git push -u origin main
```

**Resultado esperado:**
```
Enumerating objects: 67, done.
...
To https://github.com/Nateli-Silva/brasil-doces-do-vale.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Pronto! Seu código está no GitHub!**

---

### Passo 3: Fazer Deploy (Railway - 5 min)

1. Vá para: https://railway.app
2. Clique: **Login with GitHub**
3. Autorize Railway
4. Clique: **Create New Project**
5. Selecione: **Deploy from GitHub repo**
6. Escolha seu repositório: `brasil-doces-do-vale`
7. Railway detecta tudo automaticamente
8. Em 5 minutos, seu site estará online!

---

## 🔗 URLs Finais (Depois do Deploy)

```
GitHub:   https://github.com/Nateli-Silva/brasil-doces-do-vale
Vitrine:  https://seu-projeto.up.railway.app
Admin:    https://seu-projeto.up.railway.app/admin/login
```

---

## ⚙️ Variáveis de Ambiente (Railway)

No painel do Railway, configure:

```
JWT_SECRET=<gere um aleatório>
STORE_WHATSAPP_NUMBER=5574813241266
STORE_PIX_KEY=sua-chave-pix@email.com
CORS_ORIGIN=https://seu-projeto.up.railway.app
PORT=3333
NODE_ENV=production
```

---

## 💡 Dicas

✅ **GitHub é gratuito**
✅ **Railway tem $5/mês crédito grátis**
✅ **Deploy automático** a cada `git push`
✅ **Seu site rodará grátis** dentro do free tier

---

## 🎯 Próximos Passos

1. ✅ Repositório Git local pronto
2. ⏭️ Criar repositório no GitHub (Passo 1)
3. ⏭️ Fazer git push (Passo 2)
4. ⏭️ Deploy no Railway (Passo 3)
5. 🎉 Site online!

---

## 📞 Se Precisar de Ajuda

Leia estes arquivos para mais detalhes:

- `GITHUB_SETUP_STEPS.txt` - Guia visual completo
- `GITHUB_DEPLOYMENT.md` - 4 opções de hosting
- `README.md` - Documentação completa

---

**Seu site estará online em 15 minutos!** 🚀

Desenvolvido para Brasil Doces do Vale
