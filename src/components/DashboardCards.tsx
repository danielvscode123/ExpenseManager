import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { Expense } from "@/lib/firestore";
import { useFormatting } from "@/hooks/useFormatting";
import { useTranslation } from "@/hooks/useTranslation";

interface DashboardCardsProps {
  salary: number;
  expenses: Expense[];
}

export function DashboardCards({ salary, expenses }: DashboardCardsProps) {
  const { formatCurrency, getBoldClass } = useFormatting();
  const { t } = useTranslation();
  
  const totalExpenses = expenses.reduce((acc, e) => acc + Math.abs(e.amount), 0);
  const totalIncome = salary;
  const saldoTotal = totalIncome - totalExpenses;
  const economia = saldoTotal >= 0 ? saldoTotal : 0;

  const cards = [
    {
      title: t("total-balance"),
      value: formatCurrency(saldoTotal, "BRL"),
      change: "+0%",
      positive: saldoTotal >= 0,
      icon: Wallet,
    },
    {
      title: t("salary"),
      value: formatCurrency(totalIncome, "BRL"),
      change: "+0%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: t("expenses"),
      value: formatCurrency(totalExpenses, "BRL"),
      change: "-",
      positive: false,
      icon: TrendingDown,
    },
    {
      title: t("savings"),
      value: formatCurrency(economia, "BRL"),
      change: "+0%",
      positive: economia >= 0,
      icon: PiggyBank,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="glass-card p-5 transition-all duration-300 hover:glow-primary group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{card.title}</span>
            <card.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className={`text-2xl font-bold font-mono tracking-tight ${getBoldClass()}`}>
            {card.value}
          </p>
          <span
            className={`text-xs font-medium mt-1 inline-block ${
              card.positive ? "text-primary" : "text-destructive"
            }`}
          >
            {card.change} este mês
          </span>
        </div>
      ))}
    </div>
  );
}
