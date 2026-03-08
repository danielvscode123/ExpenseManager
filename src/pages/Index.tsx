import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardCards } from "@/components/DashboardCards";
import { MonthlyChart, CategoryChart } from "@/components/DashboardCharts";
import { AdvancedStats } from "@/components/AdvancedStats";
import { ExportData } from "@/components/ExportData";
import { TransactionsListAdvanced } from "@/components/TransactionsListAdvanced";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useTranslation } from "@/hooks/useTranslation";
import { SalaryModal } from "@/components/SalaryModal";
import { ExpenseModal } from "@/components/ExpenseModal";
import { WelcomeModal } from "@/components/WelcomeModal";
import { DashboardCardsSkeleton, ChartSkeleton, TransactionsListSkeleton } from "@/components/DashboardSkeleton";
import { Bell, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserSalary,
  getExpenses,
  addExpense,
  Expense,
} from "@/lib/firestore";

const Index = () => {
   const prefs = usePreferences();
  const { user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: () => getUserProfile(user!.uid),
    enabled: !!user,
  });

  const {
    data: expenses = [],
    isLoading: expensesLoading,
  } = useQuery({
    queryKey: ["expenses", user?.uid],
    queryFn: () => getExpenses(user!.uid),
    enabled: !!user,
  });

  const salaryMutation = useMutation({
    mutationFn: (salary: number) => updateUserSalary(user!.uid, salary),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", user?.uid],
      });
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: (exp: Omit<Expense, "id">) => addExpense(user!.uid, exp),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", user?.uid],
      });
    },
  });

  const [salaryModalOpen, setSalaryModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  useEffect(() => {
    if (profile && profile.salary === 0) {
      setSalaryModalOpen(true);
    }
  }, [profile]);

  // if the user closes manually while salary is still zero, reopen
  useEffect(() => {
    if (profile && profile.salary === 0 && !salaryModalOpen) {
      setSalaryModalOpen(true);
    }
  }, [profile, salaryModalOpen]);

  const handleSaveSalary = async (s: number) => {
    await salaryMutation.mutateAsync(s);
    setSalaryModalOpen(false);
  };

  const handleAddExpense = async (exp: Omit<Expense, "id">) => {
    // convert to negative value so list logic treats it as expense
    await addExpenseMutation.mutateAsync({ ...exp, amount: -Math.abs(exp.amount) });
  };

  if (profileLoading) {
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center justify-between border-b border-border/50 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Painel Financeiro</h2>
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
              <div>
                <p className="text-muted-foreground text-sm">Carregando...</p>
                <div className="h-8"></div>
              </div>
              <DashboardCardsSkeleton />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartSkeleton />
                <ChartSkeleton />
              </div>
              <TransactionsListSkeleton />
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (profileError) {
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center justify-between border-b border-border/50 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Painel Financeiro</h2>
              </div>
            </header>
            <main className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                <h3 className="text-xl font-bold">Erro ao carregar dados</h3>
                <p className="text-muted-foreground">Tente recarregar a página</p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }
 
  return (
    <SidebarProvider defaultOpen={false}>
      <WelcomeModal />
      <div className={`min-h-screen flex w-full`}>
        <AppSidebar />
        <SalaryModal
          open={salaryModalOpen}
          onClose={() => setSalaryModalOpen(false)}
          onSubmit={handleSaveSalary}
        />
        <ExpenseModal
          open={expenseModalOpen}
          onClose={() => setExpenseModalOpen(false)}
          onSave={handleAddExpense}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h2 className="text-lg font-semibold">Painel Financeiro</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                <Bell className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
            <div>
              <h1 className="text-2xl font-bold mt-1">{t("overview")}</h1>
            </div>

            <DashboardCards salary={profile?.salary ?? 0} expenses={expenses} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MonthlyChart
                salary={profile?.salary ?? 0}
                expenses={expenses}
                createdAt={profile?.createdAt?.toDate?.() ?? undefined}
                monthsRange={prefs.monthsRange}
              />
              <CategoryChart expenses={expenses} />
            </div>

            {expenses.length > 0 && (
              <AdvancedStats
                expenses={expenses}
                salary={profile?.salary ?? 0}
              />
            )}

            <div className="flex justify-end">
              <ExportData expenses={expenses} salary={profile?.salary ?? 0} />
            </div>

            <TransactionsListAdvanced
              expenses={expenses}
              onAdd={() => setExpenseModalOpen(true)}
              onViewAll={() => window.location.href = "/transactions"}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
