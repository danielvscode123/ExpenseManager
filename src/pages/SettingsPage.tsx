import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Sun, Moon, Zap, Volume2, VolumeX, History, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";

export default function SettingsPage() {
  const prefs = usePreferences();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showExportMessage, setShowExportMessage] = useState(false);

  // Opções dinâmicas baseadas no idioma
  const monthOptions = [
    { label: t("months-3"), value: 3 },
    { label: t("months-7"), value: 7 },
    { label: t("months-12"), value: 12 },
  ];

  const currencyOptions = [
    { label: "Real (R$)", value: "BRL" },
    { label: "Dólar (USD)", value: "USD" },
    { label: "Euro (EUR)", value: "EUR" },
  ];

  const languageOptions = [
    { label: t("portuguese-br"), value: "pt-BR" },
    { label: t("english-us"), value: "en-US" },
    { label: t("spanish-es"), value: "es-ES" },
  ];

  const densityOptions = [
    { label: t("compact"), value: "compact" },
    { label: t("normal"), value: "normal" },
    { label: t("spacious"), value: "spacious" },
  ];

  const fontSizeOptions = [
    { label: t("small"), value: "small" },
    { label: t("normal"), value: "normal" },
    { label: t("large"), value: "large" },
  ];

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
    prefs.setPrefs({ theme: newTheme });
  };

  const handleCurrencyChange = (currency: string) => {
    prefs.setPrefs({ currency: currency as "BRL" | "USD" | "EUR" });
  };

  const handleLanguageChange = (language: string) => {
    prefs.setPrefs({ language: language as "pt-BR" | "en-US" | "es-ES" });
  };

  const handleDensityChange = (density: string) => {
    prefs.setPrefs({ density: density as "compact" | "normal" | "spacious" });
  };

  const handleFontSizeChange = (fontSize: string) => {
    prefs.setPrefs({ fontSize: fontSize as "small" | "normal" | "large" });
  };

  const handleMonthsChange = (newMonths: number) => {
    prefs.setPrefs({ monthsRange: newMonths as 3 | 7 | 12 });
  };

  const toggleNotifications = () => {
    prefs.setPrefs({ notificationsEnabled: !prefs.notificationsEnabled });
  };

  const toggleSound = () => {
    prefs.setPrefs({ soundEnabled: !prefs.soundEnabled });
  };

  const toggleAnimations = () => {
    prefs.setPrefs({ animationsEnabled: !prefs.animationsEnabled });
  };

  const toggleBoldValues = () => {
    prefs.setPrefs({ boldValues: !prefs.boldValues });
  };

  const toggleAdvancedMode = () => {
    prefs.setPrefs({ advancedMode: !prefs.advancedMode });
  };

  const handleExportPreferences = () => {
    const prefsData = {
      ...prefs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(prefsData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `preferencias-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMessage(true);
    setTimeout(() => setShowExportMessage(false), 3000);
  };

  const handleClearHistory = async () => {
    if (confirm("Tem certeza que deseja limpar o histórico? Esta ação não pode ser desfeita.")) {
      await prefs.clearHistory();
      alert("Histórico limpo com sucesso!");
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className={`min-h-screen flex w-full`}>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 bg-background">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <button
                className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors mr-2"
                onClick={() => navigate(-1)}
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              <h2 className="text-lg font-semibold">{t("settings")}</h2>
            </div>
          </header>

          <main className="flex-1 p-6 bg-background overflow-auto">
            {prefs.isLoading ? (
              <div className="text-center text-muted-foreground">{t("loading")}</div>
            ) : (
              <div className="space-y-6 w-full max-w-2xl">
                {/* APARÊNCIA - TEMA */}
                <Card title="🌨 Tema" subtitle={t("theme")}>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 flex-1 transition">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={prefs.theme === "light"}
                          onChange={() => handleThemeChange("light")}
                          className="w-4 h-4 accent-primary"
                        />
                        <Sun className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">{t("light")}</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 flex-1 transition">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={prefs.theme === "dark"}
                          onChange={() => handleThemeChange("dark")}
                          className="w-4 h-4 accent-primary"
                        />
                        <Moon className="h-5 w-5 text-blue-400" />
                        <span className="font-medium">{t("dark")}</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 flex-1 transition">
                        <input
                          type="radio"
                          name="theme"
                          value="auto"
                          checked={prefs.theme === "auto"}
                          onChange={() => handleThemeChange("auto")}
                          className="w-4 h-4 accent-primary"
                        />
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="font-medium">{t("auto")}</span>
                      </label>
                    </div>
                  </div>
                </Card>

                {/* APARÊNCIA - DENSIDADE E FONTE */}
                <Card title="📍 Layout" subtitle={t("layout")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("density")}:</label>
                      <select
                        value={prefs.density}
                        onChange={(e) => handleDensityChange(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {densityOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("font-size")}:</label>
                      <select
                        value={prefs.fontSize}
                        onChange={(e) => handleFontSizeChange(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {fontSizeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>

                {/* DADOS FINANCEIROS */}
                <Card title={`💱 ${t("financial")}`} subtitle={t("financial")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("currency")}:</label>
                      <select
                        value={prefs.currency}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {currencyOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("chart-period")}:</label>
                      <select
                        value={prefs.monthsRange}
                        onChange={(e) => handleMonthsChange(Number(e.target.value))}
                        className="w-full border border-border rounded px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {monthOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prefs.boldValues}
                        onChange={toggleBoldValues}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-medium">{t("bold-values")}</span>
                    </label>
                  </div>
                </Card>

                {/* IDIOMA */}
                <Card title={`🌐 ${t("language")}`} subtitle={t("language")}>
                  <select
                    value={prefs.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-full border border-border rounded px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {languageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Card>

                {/* NOTIFY E SOM */}
                <Card title={`🔔 ${t("notifications")}`} subtitle={t("notifications")}>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 transition">
                      <input
                        type="checkbox"
                        checked={prefs.notificationsEnabled}
                        onChange={toggleNotifications}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{t("enable-notifications")}</p>
                        <p className="text-xs text-muted-foreground">{t("notifications-description")}</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 transition">
                      <input
                        type="checkbox"
                        checked={prefs.soundEnabled}
                        onChange={toggleSound}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1 flex items-center gap-2">
                        {prefs.soundEnabled ? (
                          <Volume2 className="h-4 w-4 text-primary" />
                        ) : (
                          <VolumeX className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{t("enable-sound")}</p>
                          <p className="text-xs text-muted-foreground">{t("sound-description")}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </Card>

                {/* EXPERIÊNCIA */}
                <Card title={`✨ ${t("experience")}`} subtitle={t("experience")}>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 transition">
                      <input
                        type="checkbox"
                        checked={prefs.animationsEnabled}
                        onChange={toggleAnimations}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{t("enable-animations")}</p>
                        <p className="text-xs text-muted-foreground">
                          {prefs.animationsEnabled
                            ? t("animations-description")
                            : t("animations-description")}
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50 transition">
                      <input
                        type="checkbox"
                        checked={prefs.advancedMode}
                        onChange={toggleAdvancedMode}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{t("advanced-mode")}</p>
                          <p className="text-xs text-muted-foreground">
                            {prefs.advancedMode
                              ? t("advanced-mode-description")
                              : t("advanced-mode-description")}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </Card>

                {/* DADOS */}
                <Card title={`📋 ${t("data")}`} subtitle={t("data")}>
                  <div className="space-y-3">
                    <Button
                      onClick={handleExportPreferences}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {t("export-preferences")}
                    </Button>
                    {showExportMessage && (
                      <div className="p-3 bg-primary/10 border border-primary/50 rounded text-sm text-primary">
                        ✓ {t("preferences-exported")}
                      </div>
                    )}
                    <Button
                      onClick={handleClearHistory}
                      variant="outline"
                      className="w-full gap-2 text-destructive hover:text-destructive"
                    >
                      <History className="h-4 w-4" />
                      {t("clear-history")}
                    </Button>
                  </div>
                </Card>

                {/* INFO */}
                <Card variant="minimal" title="Informações">
                  <div className="text-center text-sm text-muted-foreground">
                    <p>✨ Todas as suas preferências são salvas automaticamente</p>
                    <p className="mt-2 text-xs">Versão 2.0.0 • Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
