import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TransactionsListAdvanced } from "@/components/TransactionsListAdvanced";
import { AdvancedStats } from "@/components/AdvancedStats";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { ExportData } from "@/components/ExportData";
import { DashboardCardsSkeleton, TransactionsListSkeleton } from "@/components/DashboardSkeleton";
import { Bell, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, getExpenses, addExpense, Expense } from "@/lib/firestore";
import { toDate } from "@/lib/utils";

export default function TransactionsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>(() => {
    const today = new Date();
    return {
      start: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999),
    };
  });

  const {
    data: profile,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: () => getUserProfile(user!.uid),
    enabled: !!user,
  });

  const {
    data: expenses = [],
    isLoading,
  } = useQuery({
    queryKey: ["expenses", user?.uid],
    queryFn: () => getExpenses(user!.uid),
    enabled: !!user,
  });

  const addExpenseMutation = useMutation({
    mutationFn: (exp: Omit<Expense, "id">) => addExpense(user!.uid, exp),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", user?.uid],
      });
    },
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = async (exp: Omit<Expense, "id">) => {
    await addExpenseMutation.mutateAsync({ ...exp, amount: -Math.abs(exp.amount) });
  };

  // Filtrar transações por data
  const filteredExpenses = expenses.filter((e) => {
    const expDate = toDate(e.date);
    return expDate >= dateRange.start && expDate <= dateRange.end;
  });

  if (isLoading || profileLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center justify-between border-b border-border/50 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Transações</h2>
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
              <TransactionsListSkeleton />
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h2 className="text-lg font-semibold">Transações</h2>
              </div>
            </div>
            <button className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
            </button>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
            <div>
              <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                <h1 className="text-2xl font-bold">Relatório de Transações</h1>
                <div className="flex gap-2 flex-wrap">
                  <DateRangeFilter onDateRangeChange={setDateRange} />
                  <ExportData expenses={filteredExpenses} salary={profile?.salary ?? 0} />
                </div>
              </div>
            </div>

            {expenses.length > 0 && (
              <AdvancedStats
                expenses={filteredExpenses}
                salary={profile?.salary ?? 0}
              />
            )}

            <TransactionsListAdvanced
              expenses={filteredExpenses}
              onAdd={() => setModalOpen(true)}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
