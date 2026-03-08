import { usePreferences } from "@/contexts/PreferencesContext";
import { Sun, Moon, Zap, Volume2, VolumeX, Lightbulb, Zap as ZapIcon } from "lucide-react";

/**
 * Componente que mostra um resumo visual das configurações ativas
 */
export function PreferencesOverview() {
  const prefs = usePreferences();

  const languageNames = {
    "pt-BR": "🇧🇷 Português",
    "en-US": "🇺🇸 English",
    "es-ES": "🇪🇸 Español",
  };

  const currencyNames = {
    BRL: "Real (R$)",
    USD: "Dólar (USD)",
    EUR: "Euro (EUR)",
  };

  const themeIcons = {
    light: <Sun className="h-4 w-4 text-yellow-500" />,
    dark: <Moon className="h-4 w-4 text-blue-400" />,
    auto: <ZapIcon className="h-4 w-4 text-primary" />,
  };

  return (
    <div className="glass-card p-4 rounded-lg">
      <h4 className="text-sm font-semibold mb-3">Configurações Ativas</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
          {themeIcons[prefs.theme]}
          <span>{prefs.theme === "auto" ? "Automático" : prefs.theme === "light" ? "Claro" : "Escuro"}</span>
        </div>

        <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
          <span className="text-lg">💱</span>
          <span>{currencyNames[prefs.currency]}</span>
        </div>

        <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
          <span className="text-lg">🌐</span>
          <span>{languageNames[prefs.language]}</span>
        </div>

        {prefs.soundEnabled && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
            <Volume2 className="h-4 w-4 text-primary" />
            <span>Som Ativo</span>
          </div>
        )}

        {prefs.notificationsEnabled && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
            <span className="text-lg">🔔</span>
            <span>Notificações</span>
          </div>
        )}

        {prefs.advancedMode && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span>Modo Avançado</span>
          </div>
        )}

        {prefs.boldValues && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
            <span className="font-bold text-lg">B</span>
            <span>Negrito Ativo</span>
          </div>
        )}

        {!prefs.animationsEnabled && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
            <span className="text-lg">⚡</span>
            <span>Sem Animações</span>
          </div>
        )}
      </div>
    </div>
  );
}
