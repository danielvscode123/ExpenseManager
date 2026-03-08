
# Finance Palace - Gestão de Despesas com Integração Bancária 💰

Aplicativo completo de gestão de despesas com integração automática de transações bancárias via Belvo API.

**🌐 Demo ao vivo:** https://seu-frontend.web.app  
**📦 Repositório:** https://github.com/seu-usuario/ExpenseManager

---

## ✨ Características

✅ Autenticação segura com Firebase  
✅ Dashboard com visualização em tempo real de despesas  
✅ Importação automática de transações bancárias (Belvo)  
✅ Gerenciamento de múltiplas contas bancárias  
✅ Interface moderna e responsiva (React + TypeScript)  
✅ Backend seguro com Express.js (CORS + proxy)  
✅ Dados mock para testes offline  

---

## 🏗️ Stack Tecnológico

### Frontend
- **React 18** + TypeScript
- **Vite** (build rápido)
- **shadcn/ui** + Tailwind CSS
- **Firebase** (Auth + Firestore)
- **React Router** + React Query

### Backend
- **Node.js** + Express.js
- **TypeScript** + Axios
- **CORS** habilitado
- **Belvo API** proxy com fallback mock

### Infraestrutura
- **Frontend Deploy:** Firebase Hosting
- **Backend Deploy:** Vercel
- **Banco de Dados:** Firebase Firestore
- **Autenticação:** Firebase Auth

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Firebase (opcional, para produção)
- Conta Belvo (opcional, para dados reais)

### 1️⃣ Clonar Repositório

```bash
git clone https://github.com/seu-usuario/ExpenseManager.git
cd ExpenseManager
```

### 2️⃣ Instalar Dependências

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 3️⃣ Configurar Variáveis de Ambiente

#### Frontend (`.env.local`)

```bash
# Copiar exemplo (se não existir)
cp .env.local.example .env.local
```

Editar `.env.local`:
```
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-id
VITE_FIREBASE_APP_ID=seu-app-id
VITE_BACKEND_API_URL=http://localhost:3001/api
```

#### Backend (`server/.env`)

```bash
cd server
cp .env.example .env
```

Editar `server/.env`:
```
BELVO_SECRET_ID=sua-secret-id
BELVO_SECRET_PASSWORD=sua-secret-password
PORT=3001
```

### 4️⃣ Rodar Localmente

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Rodando em http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Rodando em http://localhost:5173
```

✅ Acesse: http://localhost:5173

---

## 📦 Como Usar

### 1. Criar Conta
- Clique em "Registrar"
- Insira email e senha
- Confirme seu email

### 2. Conectar Banco
- Menu principal → "Conectar Banco"
- Selecione sua instituição financeira
- Insira credenciais do banco
- Autorize acesso

### 3. Ver Dashboard
- Transações aparecem automaticamente
- Visualize gráficos e relatórios
- Filtre por data, categoria, etc

### 4. Importar Manualmente
- Na página de conexão
- Clique "Importar Transações"
- Dados sincronizados ao Firestore

---

## 🚀 Deploy em Produção

### Frontend (Firebase Hosting)

```bash
npm run build

# Se não logado ainda
firebase login

firebase deploy --only hosting
```

Resultado: `https://seu-projeto.web.app`

### Backend (Vercel)

```bash
npm install -g vercel
vercel
```

Resultado: `https://seu-projeto.vercel.app/api/belvo`

### Atualizar Variáveis de Produção

1. Editar `.env.local`:
   ```
   VITE_BACKEND_API_URL=https://seu-projeto.vercel.app/api
   ```

2. Fazer push:
   ```bash
   git add .env.local
   git commit -m "Update production APIs"
   git push
   ```

3. Configurar variáveis no Vercel:
   - Dashboard Vercel
   - Settings → Environment Variables
   - Adicionar `BELVO_SECRET_ID` e `BELVO_SECRET_PASSWORD`

---

## 🔐 Segurança

⚠️ **IMPORTANTE:** Nunca commite arquivos `.env`!

```bash
# Manter localmente, não usar pelo Git
server/.env          # IGNORADO ✅
.env.local          # IGNORADO ✅
```

Credenciais sensíveis:
- ✅ Armazenadas no backend (`server/.env`)
- ✅ Protegidas pelo `.gitignore`
- ✅ Configuradas via Vercel Environment Variables em produção

---

## 📁 Estrutura do Projeto

```
finance-palace/
├── src/
│   ├── components/           # Componentes React
│   ├── pages/               # Páginas (Dashboard, Login, etc)
│   ├── services/            # Serviços (Firebase, Belvo, Auth)
│   ├── hooks/               # Custom Hooks
│   ├── contexts/            # Context API
│   ├── lib/                 # Utilitários
│   ├── App.tsx
│   └── main.tsx
│
├── server/                  # Backend Express
│   ├── server.ts            # Servidor principal
│   ├── routes/
│   │   └── belvo.ts        # Proxy Belvo API
│   ├── .env.example        # Template variáveis
│   ├── package.json
│   └── tsconfig.json
│
├── firebase.json            # Config Firebase
├── vercel.json             # Config Vercel
├── package.json            # Dependências frontend
├── tsconfig.json
└── README.md               # Este arquivo
```

---

## 🔗 APIs Integradas

### Belvo API
Acesso a transações de bancos brasileiros:
- Itaú, Bradesco, Banco do Brasil, Caixa, Santander, e mais

**Documentação:** https://docs.belvo.io

### Firebase
- **Auth:** Autenticação por email/senha
- **Firestore:** Database em tempo real

**Documentação:** https://firebase.google.com/docs

---

## 🐛 Troubleshooting

### "Failed to load resource: 500"
**Causa:** Belvo API sem acesso à internet  
**Solução:** App usa dados mock automaticamente para testes

### "Firebase not initialized"
**Causa:** `.env.local` faltando credenciais  
**Solução:** Preencha `.env.local` com suas credenciais do Firebase

### "Backend não responde"
**Causa:** Servidor Express não está rodando  
**Solução:** Certifique-se de rodar `npm run dev` na pasta `server/`

### "Erro de CORS"
**Causa:** Backend não está configurado corretamente  
**Solução:** Verifique se `server.ts` tem CORS habilitado para seu domínio

---

## 📊 Dados Mock

Por padrão, o backend retorna dados mock quando:
- Sem conexão com internet
- Belvo API retorna erro

**Bancos mock disponíveis:**
- Itaú, Bradesco, Banco do Brasil, Caixa, Santander

**Transações mock:**
- Supermercado, Netflix, Uber, Salário, etc

Para desabilitar mock (usa API real):
```bash
# No servidor
USE_MOCK=false npm run dev
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit changes (`git commit -m 'Add nova-feature'`)
4. Push para branch (`git push origin feature/nova-feature`)
5. Abra Pull Request

---

## 📝 Licença

MIT License - Veja LICENSE.md

---

## 📞 Suporte & Contato

- 📧 Email: seu-email@example.com
- 🐛 Issues: https://github.com/seu-usuario/ExpenseManager/issues
- 💬 Discussões: https://github.com/seu-usuario/ExpenseManager/discussions

---

## 🎯 Roadmap

- [ ] Integração com mais bancos
- [ ] Exportar relatórios em PDF
- [ ] Gráficos avançados por categoria
- [ ] Alertas de limite de gasto
- [ ] App mobile (React Native)
- [ ] Theme escuro (Dark Mode)
- [ ] Autenticação via Google/GitHub
- [ ] Suporte a múltiplas moedas

---

**Última atualização:** 8 de março de 2026  
**Mantido por:** @seu-usuario
