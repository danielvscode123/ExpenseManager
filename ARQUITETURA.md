# 🏗️ Arquitetura do Projeto - Finance Palace Dashboard

## 📐 Estrutura Atual

```
finance-palace-app-main/
├── src/
│   ├── App.tsx                          # Root component com providers
│   ├── main.tsx                         # Entry point
│   ├── index.css                        # Estilos globais + animations
│   │
│   ├── components/
│   │   ├── ui/                          # shadcn-ui components
│   │   │   └── [Componentes base]
│   │   │
│   │   ├── DashboardCards.tsx           # Cards de resumo
│   │   ├── DashboardCharts.tsx          # Gráficos (AreaChart, BarChart)
│   │   ├── DashboardSkeleton.tsx        # Skeletons (NOVO)
│   │   ├──┬─ TransactionsList.tsx       # Lista simples
│   │   │  └─ TransactionsListAdvanced.tsx # Lista com filtros (NOVO)
│   │   ├── AppSidebar.tsx               # Navegação sidebar
│   │   ├── NavLink.tsx                  # Link customizado
│   │   ├── ProtectedRoute.tsx           # Guard de rotas autenticadas
│   │   │
│   │   ├── SalaryModal.tsx              # Modal para editar salário
│   │   ├── ExpenseModal.tsx             # Modal para adicionar despesa
│   │   ├── WelcomeModal.tsx             # Modal de boas-vindas
│   │   │
│   │   ├── AdvancedStats.tsx            # 4 Cards com estatísticas (NOVO)
│   │   ├── StatCard.tsx                 # Card reutilizável (NOVO)
│   │   ├── Card.tsx                     # Card genérico (NOVO)
│   │   ├── ExportData.tsx               # Botão exportar CSV (NOVO)
│   │   ├── DateRangeFilter.tsx          # Seletor de período (NOVO)
│   │   ├── ErrorBoundary.tsx            # Error handler global (NOVO)
│   │   └── NotificationCenter.tsx       # Sistema de notificações (NOVO)
│   │
│   ├── pages/
│   │   ├── Index.tsx                    # Dashboard principal
│   │   ├── Transactions.tsx             # Página de transações detalhada
│   │   ├── SettingsPage.tsx             # Configurações de tema e período
│   │   ├── Login.tsx                    # Autenticação
│   │   ├── Register.tsx                 # Registro
│   │   └── NotFound.tsx                 # 404 page
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx              # Autenticação global
│   │   └── PreferencesContext.tsx       # Preferências (tema, período)
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx               # Detector de mobile
│   │   ├── use-toast.ts                 # Sistema de toast
│   │   └── useCustomHooks.ts            # Custom hooks (NOVO)
│   │
│   ├── lib/
│   │   ├── firebase.ts                  # Configuração Firebase
│   │   ├── firestore.ts                 # Funções Firestore
│   │   ├── categories.ts                # Categorias de despesa
│   │   └── utils.ts                     # Utilitários
│   │
│   ├── router/
│   │   └── index.ts                     # Configuração de rotas
│   │
│   └── theme/
│       └── variables.css                # Variáveis de tema
│
├── public/                              # Assets estáticos
├── tests/                               # Testes unitários e E2E
│
├── package.json                         # Dependências
├── vite.config.ts                       # Configuração Vite
├── tsconfig.json                        # Configuração TypeScript
├── tailwind.config.ts                   # Configuração Tailwind CSS
├── eslint.config.js                     # Linting
│
├── MELHORIAS.md                         # Documento de melhorias (NOVO)
└── COMPONENTES.md                       # Guia de componentes (NOVO)
```

---

## 🔄 Fluxo de Dados

### Autenticação
```
Login/Register
    ↓
Firebase Auth
    ↓
AuthContext
    ↓
ProtectedRoute
    ↓
App Pages
```

### Preferências do Usuário
```
SettingsPage (Usuário altera tema/período)
    ↓
PreferencesContext.setPrefs()
    ↓
setUserPreferences (Firestore)
    ↓
Documento atualizado em Firestore
    ↓
Context atualiza state
    ↓
Componentes re-renderizam
    ↓
DOM atualiza (theme classes + data)
```

### Despesas
```
ExpenseModal
    ↓
addExpenseMutation (useMutation)
    ↓
addExpense (Firestore)
    ↓
Document adicionado
    ↓
queryClient.invalidateQueries()
    ↓
getExpenses re-executa
    ↓
State atualizado
    ↓
Componentes re-renderizam
```

---

## 🧩 Camadas da Aplicação

### 1. **Presentation Layer** (Componentes)
Responsáveis por renderizar UI
- `components/` - Todos os componentes visuais
- `pages/` - Páginas principais
- Sem lógica de negócio

### 2. **Logic Layer** (Hooks e Context)
Responsáveis por gerenciar estado
- `contexts/` - Estado global (Auth, Preferences)
- `hooks/` - Lógica customizada reutilizável
- React Query - Server state management

### 3. **Data Layer** (Firestore)
Responsável por persistência
- `lib/firestore.ts` - CRUD operations
- `lib/firebase.ts` - Configuração
- Firestore collections

### 4. **Routing Layer**
Responsável por navegação
- `router/index.ts` - Definição de rotas
- `components/ProtectedRoute.tsx` - Guards
- React Router

---

## 📊 State Management

### Global State (Context API)
```
AuthContext
├── user
├── level
├── login()
├── register()
├── logout()

PreferencesContext
├── theme ('light' | 'dark')
├── monthsRange (3 | 7 | 12)
├── setPrefs()
└── isLoading
```

### Server State (React Query)
```
Queries:
├── profile → getUserProfile
├── expenses → getExpenses

Mutations:
├── updateUserSalary
└── addExpense
```

### Local State (useState)
```
Componentes usam useState para:
├── Modal open/close
├── Form inputs
├── Filter state
└── Pagination
```

---

## 🎯 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│            User Interactions                    │
│  (Clickers, Inputs, Navigation)                │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  Components    │
        │  (Presentation)│
        └────────┬───────┘
                 │
    ┌────────────┼─────────────┐
    │            │             │
    ▼            ▼             ▼
┌───────┐  ┌──────────┐  ┌──────────┐
│Hooks  │  │Contexts  │  │React Q.  │
│(Logic)│  │(Global)  │  │(ServerS.)│
└───┬───┘  └────┬─────┘  └────┬─────┘
    │           │             │
    └───────────┼─────────────┘
                │
                ▼
         ┌────────────┐
         │ Firestore  │
         │ (Persist)  │
         └────────────┘
                ▼
         Database Updates
```

---

## 🔐 Segurança

### Autenticação
- Firebase Authentication (Email/Password + Social)
- JWT tokens gerenciados automaticamente
- Session management via AuthContext

### Autorização
- ProtectedRoute wrapper para páginas autenticadas
- Verificação de UID no Firestore
- Regras de segurança do Firestore

### Dados Sensíveis
```firestore
/users/{uid}/
├── salary (privado)
├── expenses/{expenseId}/ (privado)
└── preferences/main (privado)
```

---

## ⚡ Performance

### Otimizações Implementadas

1. **Code Splitting**
   - React Router lazy loading
   - Dynamic imports onde possível

2. **Memoization**
   - useMemo para cálculos pesados
   - useCallback para funções
   - React.memo para componentes

3. **Caching**
   - React Query caching configuration
   - localStorage para welcome modal
   - Firestore document caching

4. **Bundle Size**
   - shadcn-ui imports apenas componentes necessários
   - Tree-shaking habilitado
   - Tailwind purge configurado

5. **Rendering**
   - Lazy loading de skeletons
   - Paginação para listas grandes (5 itens por página)
   - Debounce para search inputs

---

## 🧪 Testing Strategy

### Tipos de Testes
```
Unit Tests
├── lib/firestore.ts - Funções utilitárias
├── hooks/useCustomHooks.ts - Hook logic
└── utils.ts - Helpers

Component Tests
├── DashboardCards.tsx
├── TransactionsListAdvanced.tsx
└── Modals

E2E Tests (Cypress)
├── Login flow
├── Criar despesa
├── Buscar transações
└── Exportar CSV
```

---

## 🚀 Deployment

### Build
```bash
npm run build
```
Gera `/dist` optimizado

### Hosting
- Firebase Hosting (recomendado)
- Vercel (alternativa)
- Netlify (alternativa)

### Environment Variables
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

---

## 🔄 CI/CD (Sugerido)

```yaml
name: Build & Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install dependencies
      - Run tests
      - Run linting
      - Build project
      - Deploy to Firebase/Vercel
```

---

## 📚 Dependências Principais

```json
{
  "dependencies": {
    "react": "^18",
    "react-router-dom": "^6",
    "firebase": "^latest",
    "@tanstack/react-query": "^5",
    "@radix-ui/[components]": "^latest",
    "lucide-react": "^latest",
    "recharts": "^latest",
    "tailwindcss": "^3",
    "class-variance-authority": "^latest"
  },
  "devDependencies": {
    "typescript": "^5",
    "vite": "^5",
    "eslint": "^8",
    "tailwindcss": "^3"
  }
}
```

---

## 🎓 Próximas Implementações

### Curto Prazo
- [ ] Validação com Zod
- [ ] Notificações de push
- [ ] Orçamento mensal

### Médio Prazo
- [ ] Autenticação multi-factor
- [ ] Sincronização offline
- [ ] PWA (installable app)

### Longo Prazo
- [ ] GraphQL API (ao invés REST)
- [ ] Microsserviços
- [ ] Analytics avançado
- [ ] Machine learning para insights

---

**Versão da Arquitetura**: 2.0.0  
**Última atualização**: Março 2026  
**Mantido por**: Time de Desenvolvimento
