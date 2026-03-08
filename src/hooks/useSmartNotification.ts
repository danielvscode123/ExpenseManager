import { usePreferences } from "@/contexts/PreferencesContext";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/useSound";

/**
 * Hook para exibir notificações respeitando preferências do usuário
 */
export function useSmartNotification() {
  const prefs = usePreferences();
  const { toast } = useToast();
  const { playNotification, playError, playWarning } = useSound();

  const notify = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
    options?: {
      duration?: number;
    }
  ) => {
    if (!prefs.notificationsEnabled) return;

    // Reproduzir som baseado no tipo
    if (type === "success") {
      playNotification();
    } else if (type === "error") {
      playError();
    } else if (type === "warning") {
      playWarning();
    }

    // Mostrar toast
    toast({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      duration: options?.duration || 3000,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  const success = (message: string, duration?: number) =>
    notify(message, "success", { duration });

  const error = (message: string, duration?: number) =>
    notify(message, "error", { duration });

  const warning = (message: string, duration?: number) =>
    notify(message, "warning", { duration });

  const info = (message: string, duration?: number) =>
    notify(message, "info", { duration });

  return { notify, success, error, warning, info };
}
