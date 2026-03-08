import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Expense } from "@/lib/firestore";
import { toDate } from "@/lib/utils";

interface ExportDataProps {
  expenses: Expense[];
  salary: number;
}

export function ExportData({ expenses, salary }: ExportDataProps) {
  const exportToCSV = () => {
    const headers = ["Data", "Descrição", "Categoria", "Valor"];
    const rows = expenses.map((exp) => {
      const date = toDate(exp.date).toLocaleDateString("pt-BR");
      return [
        date,
        exp.description || "Sem descrição",
        exp.category,
        Math.abs(exp.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
      ];
    });

    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.join(";")),
      "",
      ["Resumo", "", "", ""],
      ["Salário Mensal", "", "", salary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })],
      [
        "Total de Despesas",
        "",
        "",
        expenses.reduce((acc, e) => acc + Math.abs(e.amount), 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
      ],
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio-financeiro-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={exportToCSV}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Exportar CSV
    </Button>
  );
}
