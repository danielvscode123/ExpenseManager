import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useMemo } from "react";
import { Expense } from "@/lib/firestore";
import { labelForCategory } from "@/lib/categories";
import { useFormatting } from "@/hooks/useFormatting";
import { toDate } from "@/lib/utils";

interface MonthlyChartProps {
  expenses: Expense[];
  salary: number;
  createdAt?: Date;
  monthsRange?: number;
}

function buildMonthlyData(expenses: Expense[], salary: number, createdAt?: Date, monthsRange?: number) {
  const map = new Map<number, { receita: number; despesa: number }>();
  
  // Initialize all 12 months
  for (let i = 0; i < 12; i++) {
    map.set(i, { receita: 0, despesa: 0 });
  }
  
  expenses.forEach((e) => {
    try {
      let d: Date;
      if (e.date instanceof Date) {
        d = e.date;
      } else if (e.date && typeof e.date.toDate === 'function') {
        d = e.date.toDate();
      } else if (e.date instanceof Object && 'seconds' in e.date) {
        // Handle Firestore Timestamp plain object
        d = new Date((e.date as any).seconds * 1000);
      } else {
        d = new Date(e.date as any);
      }
      
      const monthIndex = d.getMonth();
      const entry = map.get(monthIndex) ?? { receita: 0, despesa: 0 };
      entry.despesa += Math.abs(e.amount);
      map.set(monthIndex, entry);
    } catch (err) {
      console.error('Erro ao processar despesa:', e, err);
    }
  });
  
  // adicionar salário em todos os meses do ano
  for (let i = 0; i < 12; i++) {
    const entry = map.get(i) ?? { receita: 0, despesa: 0 };
    entry.receita += salary;
    map.set(i, entry);
  }

  // Determinar faixa de meses baseada em monthsRange
  let startIdx = 0;
  let endIdx = 11;

  if (monthsRange === 12) {
    // Mostrar todos os 12 meses
    startIdx = 0;
    endIdx = 11;
  } else if (monthsRange && createdAt) {
    // Centrar no mês de criação
    const createdMonth = (createdAt instanceof Date ? createdAt : new Date(createdAt)).getMonth();
    const half = Math.floor(monthsRange / 2);
    
    startIdx = createdMonth - half;
    endIdx = startIdx + monthsRange - 1;
    
    // Ajustar se sair dos limites
    if (startIdx < 0) {
      startIdx = 0;
      endIdx = Math.min(11, monthsRange - 1);
    }
    if (endIdx > 11) {
      endIdx = 11;
      startIdx = Math.max(0, endIdx - monthsRange + 1);
    }
  } else if (monthsRange) {
    // Sem createdAt, começar do início
    startIdx = 0;
    endIdx = Math.min(11, monthsRange - 1);
  } else if (createdAt) {
    // Padrão: 3 meses centrados no mês de criação
    const createdMonth = (createdAt instanceof Date ? createdAt : new Date(createdAt)).getMonth();
    startIdx = Math.max(0, createdMonth - 1);
    endIdx = Math.min(11, createdMonth + 1);
  }

  // Build months to show
  const order = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const arr = [];
  for (let i = startIdx; i <= endIdx; i++) {
    const name = order[i];
    const vals = map.get(i) ?? { receita: 0, despesa: 0 };
    arr.push({ name, ...vals });
  }
  return arr;
}

export function MonthlyChart({ expenses, salary, createdAt, monthsRange }: MonthlyChartProps) {
  const { formatCurrency } = useFormatting();
  const data = useMemo(
    () => buildMonthlyData(expenses, salary, createdAt, monthsRange),
    [expenses, salary, createdAt, monthsRange]
  );

  const CustomTooltipWithFormat = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-2xl">
          {label && (
            <p className="font-bold text-primary mb-3 text-sm">{label}</p>
          )}
          <div className="space-y-2">
            {payload.map((entry: any, i: number) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">{entry.name}</span>
                <span 
                  className="font-semibold text-sm font-mono"
                  style={{ color: entry.color }}
                >
                  {formatCurrency(entry.value, "BRL")}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Salário vs Despesas
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(155, 60%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(155, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 16%)" />
            <XAxis dataKey="name" stroke="hsl(215, 12%, 50%)" fontSize={12} />
            <YAxis stroke="hsl(215, 12%, 50%)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltipWithFormat />} />
            <Area
              type="monotone"
              dataKey="receita"
              name="Salário"
              stroke="hsl(155, 60%, 45%)"
              fill="url(#colorReceita)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="despesa"
              name="Despesa"
              stroke="hsl(0, 72%, 55%)"
              fill="url(#colorDespesa)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface CategoryChartProps {
  expenses: Expense[];
}

export function CategoryChart({ expenses }: CategoryChartProps) {
  const { formatCurrency } = useFormatting();
  const data = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + Math.abs(e.amount);
    });
    return Object.entries(categoryMap).map(([key, val]) => ({ name: labelForCategory(key), valor: val }));
  }, [expenses]);

  const CategoryTooltipWithFormat = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-primary/50 rounded-md px-3 py-2 shadow-lg" style={{ borderColor: data.fill }}>
          <p className="text-xs text-muted-foreground mb-1">{data.payload.name}</p>
          <span 
            className="font-bold text-sm font-mono"
            style={{ color: data.fill }}
          >
            {formatCurrency(data.value, "BRL")}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Despesas por Categoria
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 16%)" horizontal={false} />
            <XAxis type="number" stroke="hsl(215, 12%, 50%)" fontSize={12} tickFormatter={(v) => `R$${v}`} />
            <YAxis dataKey="name" type="category" stroke="hsl(215, 12%, 50%)" fontSize={12} width={90} />
            <Tooltip content={<CategoryTooltipWithFormat />} cursor={false} />
            <Bar
              dataKey="valor"
              name="Valor"
              fill="hsl(155, 60%, 45%)"
              radius={[0, 6, 6, 0]}
              barSize={28}
              activeBar={{ fill: "hsl(155, 70%, 40%)", stroke: "hsl(155, 60%, 50%)", strokeWidth: 2 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
