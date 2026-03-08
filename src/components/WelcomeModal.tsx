import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeModalProps {
  userName?: string;
}

export function WelcomeModal({ userName }: WelcomeModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Mostrar modal só se for a primeira vez (verificar localStorage)
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setOpen(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-2xl"></div>
              <Sparkles className="h-16 w-16 text-primary relative" />
            </div>
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-bold">
              Bem-vindo ao Finance Palace! 👋
            </DialogTitle>
            <DialogDescription className="text-base mt-4">
              Seu personal financeiro inteligente está pronto para ajudar você a
              organizar suas finanças e alcançar seus objetivos.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-6 text-left">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
              <div className="text-primary font-bold text-lg mt-1">💰</div>
              <div>
                <p className="font-semibold text-sm">Acompanhe seu salário</p>
                <p className="text-xs text-muted-foreground">
                  Registre e acompanhe sua renda mensal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
              <div className="text-destructive font-bold text-lg mt-1">📊</div>
              <div>
                <p className="font-semibold text-sm">Controle despesas</p>
                <p className="text-xs text-muted-foreground">
                  Visualize gastos por categoria em tempo real
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
              <div className="text-primary font-bold text-lg mt-1">⚙️</div>
              <div>
                <p className="font-semibold text-sm">Personalize</p>
                <p className="text-xs text-muted-foreground">
                  Ajuste tema, período do gráfico e mais nas configurações
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:flex-col">
            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              size="lg"
            >
              Começar agora
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Você pode acessar este guia novamente nas configurações
            </p>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
