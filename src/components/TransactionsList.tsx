import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Gift,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { Expense } from "@/lib/firestore";
import { labelForCategory } from "@/lib/categories";
import { useFormatting } from "@/hooks/useFormatting";
import { toDate } from "@/lib/utils";

const iconMap: Record<string, any> = {
  shopping: ShoppingCart,
  home: Home,
  transport: Car,
  food: Utensils,
  work: Briefcase,
  gift: Gift,
  other: ShoppingCart,
};

interface TransactionsListProps {
  expenses: Expense[];
  onAdd?: () => void;
}

export function TransactionsList({ expenses, onAdd }: TransactionsListProps) {
  const { formatCurrency } = useFormatting();
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Transações Recentes
        </h3>
        <div className="flex gap-4">
          {onAdd && (
            <button onClick={onAdd} className="text-xs text-primary hover:underline">
              Adicionar
            </button>
          )}
          <button className="text-xs text-primary hover:underline">Ver todas</button>
        </div>
      </div>
      <div className="space-y-3">
        {expenses.length === 0 && (
          <p className="text-xs text-muted-foreground">Nenhuma transação ainda.</p>
        )}
        {expenses.map((t) => {
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
    </div>
  );
}
