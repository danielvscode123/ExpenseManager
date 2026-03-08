import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Gift,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";
import { Expense } from "@/lib/firestore";
import { labelForCategory } from "@/lib/categories";
import { useFormatting } from "@/hooks/useFormatting";
import { toDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconMap: Record<string, any> = {
  shopping: ShoppingCart,
  home: Home,
  transport: Car,
  food: Utensils,
  work: Briefcase,
  gift: Gift,
  other: ShoppingCart,
};

interface TransactionsListAdvancedProps {
  expenses: Expense[];
  onAdd?: () => void;
  onViewAll?: () => void;
}

export function TransactionsListAdvanced({
  expenses,
  onAdd,
  onViewAll,
}: TransactionsListAdvancedProps) {
  const { formatCurrency } = useFormatting();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar e buscar
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesSearch =
        e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        labelForCategory(e.category).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || e.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, filterCategory]);

  // Paginação
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginatedExpenses = filtered.slice(start, start + itemsPerPage);

  const categories = useMemo(
    () => Array.from(new Set(expenses.map((e) => e.category))),
    [expenses]
  );

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Transações Recentes
        </h3>
        <div className="flex gap-2">
          {onAdd && (
            <button onClick={onAdd} className="text-xs text-primary hover:underline">
              Adicionar
            </button>
          )}
          {onViewAll && (
            <button onClick={onViewAll} className="text-xs text-primary hover:underline">
              Ver todas
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            placeholder="    Buscar transações..."
            className={`h-8 text-xs pr-8 ${searchTerm ? 'pl-8' : 'pl-8'}`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20"
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Select value={filterCategory} onValueChange={(v) => {
          setFilterCategory(v);
          setPage(1);
        }}>
          <SelectTrigger className="w-40 h-8 text-xs">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {labelForCategory(cat)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground py-4 text-center">
            Nenhuma transação encontrada.
          </p>
        )}
        {paginatedExpenses.map((t) => {
          const Icon = iconMap[t.category] || ShoppingCart;
          const isIncome = t.amount > 0;
          const amount = t.amount;
          const dateStr = toDate(t.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors"
            >
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {t.description || labelForCategory(t.category)}
                </p>
                <p className="text-xs text-muted-foreground">{dateStr}</p>
              </div>
              <div className="flex items-center gap-1">
                {isIncome ? (
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                ) : (
                  <ArrowDownLeft className="h-3 w-3 text-destructive" />
                )}
                <span
                  className={`text-sm font-mono font-medium ${
                    isIncome ? "text-primary" : "text-destructive"
                  }`}
                >
                  {formatCurrency(Math.abs(amount), "BRL")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border/50">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-xs px-2 py-1 rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <span className="text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-xs px-2 py-1 rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo →
          </button>
        </div>
      )}
    </div>
  );
}
