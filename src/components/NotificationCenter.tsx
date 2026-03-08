import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export interface NotificationMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    // Você pode conectar isso ao seu sistema global de notificações quando necessário
    // Por enquanto, é um exemplo de como usar
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getConfig = (type: "success" | "error" | "info") => {
    const configs = {
      success: { icon: CheckCircle, bgColor: "bg-primary/10", textColor: "text-primary" },
      error: { icon: AlertCircle, bgColor: "bg-destructive/10", textColor: "text-destructive" },
      info: { icon: Info, bgColor: "bg-blue/10", textColor: "text-blue" },
    };
    return configs[type];
  };

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-sm">
      {notifications.map((notif) => {
        const config = getConfig(notif.type);
        const Icon = config.icon;

        useEffect(() => {
          if (notif.duration) {
            const timer = setTimeout(() => removeNotification(notif.id), notif.duration);
            return () => clearTimeout(timer);
          }
        }, [notif]);

        return (
          <div
            key={notif.id}
            className={`${config.bgColor} border border-border rounded-lg p-4 flex items-center gap-3 animate-slide-in-right shadow-lg`}
          >
            <Icon className={`h-5 w-5 ${config.textColor} flex-shrink-0`} />
            <p className="text-sm font-medium flex-1">{notif.message}</p>
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
