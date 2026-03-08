import { Expense } from "@/lib/firestore";
import { labelForCategory } from "@/lib/categories";
import { TrendingDown, TrendingUp, Target, AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { useFormatting } from "@/hooks/useFormatting";
import { toDate } from "@/lib/utils";

interface AdvancedStatsProps {
  expenses: Expense[];
  salary: number;
}

export function AdvancedStats({ expenses, salary }: AdvancedStatsProps) {
  const { formatCurrency } = useFormatting();
  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce((acc, e) => acc + Math.abs(e.amount), 0);
    
    // Maior categoria de gasto
    const categoryMap = new Map<string, number>();
    expenses.forEach((e) => {
      categoryMap.set(e.category, (categoryMap.get(e.category) || 0) + Math.abs(e.amount));
    });
    const topCategory = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1])[0];
    
    // Dia com maior gasto
    const dateMap = new Map<string, number>();
    expenses.forEach((e) => {
      const date = toDate(e.date).toLocaleDateString("pt-BR");
      dateMap.set(date, (dateMap.get(date) || 0) + Math.abs(e.amount));
    });
    const topDate = Array.from(dateMap.entries()).sort((a, b) => b[1] - a[1])[0];
    
    // Média mensal
    const months = new Set<string>();
    expenses.forEach((e) => {
      const date = toDate(e.date);
      months.add(`${date.getFullYear()}-${date.getMonth()}`);
    });
    const averageExpense = months.size > 0 ? totalExpenses / months.size : 0;
    
    // Percentual de economia
    const saldo = salary - totalExpenses;
    const savingsRate = salary > 0 ? (saldo / salary) * 100 : 0;

    return {
      totalExpenses,
      topCategory,
      topDate,
      averageExpense,
      savingsRate,
      saldo,
    };
  }, [expenses, salary]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Maior Categoria */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Maior Gasto</span>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </div>
        <p className="text-lg font-bold font-mono">
          {stats.topCategory ? labelForCategory(stats.topCategory[0]) : "-"}
        </p>
        <p className="text-sm text-destructive font-mono">
          {stats.topCategory ? formatCurrency(stats.topCategory[1], "BRL") : "N/A"}
        </p>
      </div>

      {/* Dia com Maior Gasto */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Dia Maior Gasto</span>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </div>
        <p className="text-lg font-bold font-mono">
          {stats.topDate ? stats.topDate[0] : "-"}
        </p>
        <p className="text-sm text-destructive font-mono">
          {stats.topDate ? formatCurrency(stats.topDate[1], "BRL") : "N/A"}
        </p>
      </div>

      {/* Média Mensal */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Média Mensal</span>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <p className="text-lg font-bold font-mono">
          {formatCurrency(stats.averageExpense, "BRL")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {expenses.length} transações
        </p>
      </div>

      {/* Taxa de Poupança */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Taxa Poupança</span>
          <Target className="h-4 w-4 text-primary" />
        </div>
        <p className={`text-lg font-bold font-mono ${stats.savingsRate >= 0 ? "text-primary" : "text-destructive"}`}>
          {stats.savingsRate.toFixed(1)}%
        </p>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          {formatCurrency(stats.saldo, "BRL")}
        </p>
      </div>
    </div>
  );
}
