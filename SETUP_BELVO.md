# Finance Palace - Integração Belvo

## Configuração do Backend Proxy

O backend proxy é necessário para contornar limitações de CORS ao acessar a API Belvo.

### 1. Instalar dependências do servidor

```bash
cd server
npm install
```

### 2. Configurar variáveis de ambiente

O arquivo `server/.env` já está configurado com as credenciais Belvo.

### 3. Rodar o servidor

**Em desenvolvimento:**
```bash
cd server
npm run dev
```

O servidor rodará em: `http://localhost:3001`

### 4. Rodar o frontend (em outro terminal)

```bash
npm run dev
```

O frontend rodará em: `http://localhost:8080` (ou outra porta conforme Vite definir)

---

## Fluxo de Funcionamento

1. **Frontend** (React) → faz requisição para `http://localhost:3001/api/belvo`
2. **Backend Proxy** (Express) → faz requisição autenticada para `https://api.belvo.io/api`
3. **Belvo API** → retorna dados ao backend
4. **Backend** → retorna dados ao frontend

---

## Endpoints Disponíveis

- `GET /api/belvo/institutions` - Listar bancos
- `POST /api/belvo/links` - Conectar banco
- `GET /api/belvo/links` - Listar conexões
- `GET /api/belvo/accounts` - Listar contas
- `GET /api/belvo/transactions` - Listar transações
- `DELETE /api/belvo/links/:id` - Desconectar banco

---

## Troubleshooting

**Erro: "Erro ao carregar instituições"**
- Verifique se o servidor backend está rodando (`localhost:3001`)
- Verifique as credenciais Belvo em `server/.env`

**Erro: "Network Error"**
- Certifique-se de que o backend está iniciado
- Verifique a URL em `VITE_BACKEND_API_URL` no `.env.local` do frontend

---

## Estrutura de Pastas

```
finance-palace-app-main/
├── src/                    # Frontend React
│   ├── services/
│   │   └── belvoService.ts # Cliente HTTP para backend proxy
│   ├── hooks/
│   │   └── useBelvo.ts     # Hook do React
│   └── pages/
│       └── BankConnection.tsx
├── server/                 # Backend Express
│   ├── routes/
│   │   └── belvo.ts        # Rotas proxy Belvo
│   ├── server.ts           # Arquivo principal
│   ├── .env                # Variáveis de ambiente (credenciais Belvo)
│   └── package.json
└── .env.local              # Variáveis do frontend
```

---

## Segurança

✅ Credenciais Belvo estão apenas no servidor (`.env` do servidor)
✅ Frontend não expõe nenhuma chave sensível
✅ CORS configurado para aceitar apenas localhost
✅ Todas as requisições ao Belvo são autenticadas

---

Desenvolvido com ❤️ usando Express + React + Belvo API
