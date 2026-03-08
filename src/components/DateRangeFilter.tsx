import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeFilterProps {
  onDateRangeChange?: (range: { start: Date; end: Date }) => void;
  initialPeriod?: string;
}

export function DateRangeFilter({ onDateRangeChange, initialPeriod = "mes" }: DateRangeFilterProps) {
  const [period, setPeriod] = useState(initialPeriod);

  const getDateRange = (p: string) => {
    const today = new Date();
    let start: Date;

    switch (p) {
      case "dia":
        start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        break;
      case "semana":
        start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        break;
      case "mes":
        start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        break;
      case "trimestre":
        start = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        break;
      case "ano":
        start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        break;
      default:
        start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    }

    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return { start, end };
  };

  // Initialize date range on mount
  useEffect(() => {
    const { start, end } = getDateRange(period);
    onDateRangeChange?.({ start, end });
  }, []);

  const handleChange = (value: string) => {
    setPeriod(value);
    const { start, end } = getDateRange(value);
    // Pass as object to match setDateRange signature
    onDateRangeChange?.({ start, end });
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select value={period} onValueChange={handleChange}>
        <SelectTrigger className="w-40 h-8 text-xs">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dia">Hoje</SelectItem>
          <SelectItem value="semana">Últimos 7 dias</SelectItem>
          <SelectItem value="mes">Último mês</SelectItem>
          <SelectItem value="trimestre">Último trimestre</SelectItem>
          <SelectItem value="ano">Último ano</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
