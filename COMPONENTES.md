# 📚 Guia de Componentes - Finance Palace

## Novos Componentes Profissionais

### 🎨 Componentes de UI

#### 1. **StatCard**
```tsx
import { StatCard } from "@/components/StatCard";

<StatCard
  title="Saldo Total"
  value="R$ 5.234,00"
  change="+10%"
  changeType="positive"
  trend="up"
  loading={false}
/>
```
- Exibe estatísticas com ícone e indicador de tendência
- Estados: loading, error, success
- Tipos de mudança: positive, negative, neutral

#### 2. **Card (Componente Genérico)**
```tsx
import { Card } from "@/components/Card";

<Card
  title="Minhas Transações"
  subtitle="Últimas 30 dias"
  collapsible={true}
  actions={<Button>Exportar</Button>}
>
  {/* Conteúdo */}
</Card>
```
- Design system completo para cards
- Suporta collapse/expand
- 3 variantes: default, minimal, filled

#### 3. **DashboardSkeleton**
```tsx
import { DashboardCardsSkeleton, ChartSkeleton } from "@/components/DashboardSkeleton";

{isLoading && <DashboardCardsSkeleton />}
```
- Skeletons animados para melhor UX
- 3 tipos de skeleton: cards, charts, lists

#### 4. **TransactionsListAdvanced**
```tsx
import { TransactionsListAdvanced } from "@/components/TransactionsListAdvanced";

<TransactionsListAdvanced
  expenses={expenses}
  onAdd={() => setModalOpen(true)}
  onViewAll={() => navigate("/transactions")}
/>
```
- Busca e filtro integrados
- Paginação automática
- 5 itens por página

#### 5. **AdvancedStats**
```tsx
import { AdvancedStats } from "@/components/AdvancedStats";

<AdvancedStats expenses={expenses} salary={salary} />
```
- 4 Cards com métricas:
  - Maior categoria de gasto
  - Dia com maior gasto
  - Média mensal
  - Taxa de poupança

#### 6. **DateRangeFilter**
```tsx
import { DateRangeFilter } from "@/components/DateRangeFilter";

<DateRangeFilter
  onDateRangeChange={(start, end) => handleFilter(start, end)}
/>
```
- Opções pré-definidas: dia, semana, mês, trimestre, ano
- Callback com dates

#### 7. **ExportData**
```tsx
import { ExportData } from "@/components/ExportData";

<ExportData expenses={expenses} salary={salary} />
```
- Exporta para CSV instantaneamente
- Inclui resumo financeiro automaticamente

#### 8. **ErrorBoundary**
```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```
- Captura erros globais
- Fallback UI amigável
- Sem risco de crash total

#### 9. **NotificationCenter**
```tsx
import { NotificationCenter } from "@/components/NotificationCenter";

<NotificationCenter />
```
- Exibe notificações no canto superior direito
- Tipos: success, error, info
- Auto-dismiss após 3 segundos

---

## 🔄 Custom Hooks

### useLoading
```tsx
import { useLoading } from "@/hooks/useCustomHooks";

const { isLoading, startLoading, stopLoading } = useLoading();

// startLoading();  // Define isLoading = true
// stopLoading();   // Define isLoading = false
```

### useFormState
```tsx
import { useFormState } from "@/hooks/useCustomHooks";

const { formData, errors, updateField, setFieldError, reset } = useFormState({
  name: "",
  email: "",
});

// updateField("name", "João");
// setFieldError("email", "Email inválido");
// reset();
```

### usePagination
```tsx
import { usePagination } from "@/hooks/useCustomHooks";

const { currentPage, goToPage, nextPage, prevPage, getPaginatedData } = usePagination(10);

const { paginatedData, totalPages } = getPaginatedData(myArray);
```

### useDebounce
```tsx
import { useDebounce } from "@/hooks/useCustomHooks";

const searchTerm = "..."
const debouncedSearch = useDebounce(searchTerm, 500);
// searchTerm vai latency de 500ms
```

### useNotification
```tsx
import { useNotification } from "@/hooks/useCustomHooks";

const { notification, showNotification } = useNotification();

showNotification("Salvo com sucesso!", "success");
```

---

## 🎨 Classes CSS Novas

### Animações
```tsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-in-right">Slide in right</div>
<div className="animate-pulse-soft">Pulse suave</div>
```

### Transições
```tsx
<div className="transition-smooth">Transição suave</div>
<div className="hover-glow">Efeito glow no hover</div>
```

---

## 📦 Imports Rápidos

```typescript
// Components
import { DashboardCardsSkeleton, ChartSkeleton } from "@/components/DashboardSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TransactionsListAdvanced } from "@/components/TransactionsListAdvanced";
import { AdvancedStats } from "@/components/AdvancedStats";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { ExportData } from "@/components/ExportData";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/Card";
import { NotificationCenter } from "@/components/NotificationCenter";

// Hooks
import { 
  useLoading,
  useFormState, 
  usePagination,
  useDebounce,
  useNotification 
} from "@/hooks/useCustomHooks";
```

---

##  💡 Padrões de Uso

### Padrão: Loading com Skeleton
```tsx
if (isLoading) {
  return <DashboardCardsSkeleton />;
}

return <DashboardCards {...props} />;
```

### Padrão: Error Handling
```tsx
if (error) {
  return (
    <div className="text-center">
      <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
      <h3>Erro ao carregar</h3>
    </div>
  );
}
```

### Padrão: Filtro + Paginação
```tsx
const { formData, updateField } = useFormState({ search: "" });
const debouncedSearch = useDebounce(formData.search, 300);
const { paginatedData, totalPages } = getPaginatedData(filtered);

return (
  <>
    <Input 
      value={formData.search}
      onChange={(e) => updateField("search", e.target.value)}
    />
    {/* Pagination controls */}
  </>
);
```

---

## 🎯 Best Practices

1. **Use ErrorBoundary** envolvendo rotas principais
2. **Use Skeletons** durante loading - nunca deixe em branco
3. **Valide formulários** com useFormState + setFieldError
4. **Debounce buscas** para evitar requests excessivos
5. **Use Card** para agrupar conteúdo relacionado
6. **Use StatCard** para mostrar métricas
7. **Sempre tenha fallback** para erros

---

## 📱 Responsividade

Todos os componentes são responsivos usando:
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- `flex-wrap` para itens
- `min-w-0` para overflow handling
- `max-w-sm` para limitação de width máximo

---

## 🚀 Performance

- Memoization onde necessário
- Debounce para inputs de busca
- Paginação para listas grandes
- Lazy loading de componentes quando possível
- CSS animations otimizadas (use `transform` e `opacity`)

