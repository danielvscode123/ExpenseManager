import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserPreferences, setUserPreferences } from "@/lib/firestore";

interface Preferences {
  theme: "light" | "dark" | "auto";
  monthsRange: 3 | 7 | 12;
  currency: "BRL" | "USD" | "EUR";
  density: "compact" | "normal" | "spacious";
  language: "pt-BR" | "en-US" | "es-ES";
  fontSize: "small" | "normal" | "large";
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  saveHistory: boolean;
  animationsEnabled: boolean;
  boldValues: boolean;
  advancedMode: boolean;
}

interface PreferencesContextType extends Preferences {
  setPrefs: (prefs: Partial<Preferences>) => Promise<void>;
  isLoading: boolean;
  clearHistory: () => Promise<void>;
}

const defaultPrefs: Preferences = {
  theme: "auto",
  monthsRange: 7,
  currency: "BRL",
  density: "normal",
  language: "pt-BR",
  fontSize: "normal",
  notificationsEnabled: true,
  soundEnabled: false,
  saveHistory: true,
  animationsEnabled: true,
  boldValues: false,
  advancedMode: true,
};

const PreferencesContext = createContext<PreferencesContextType>({
  ...defaultPrefs,
  setPrefs: async () => {},
  isLoading: true,
  clearHistory: async () => {},
});

export function usePreferences() {
  return useContext(PreferencesContext);
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Preferences>(defaultPrefs);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar preferências quando o usuário faz login
  useEffect(() => {
    if (user?.uid) {
      getUserPreferences(user.uid)
        .then((data) => {
          if (data) {
            setPrefs({ ...defaultPrefs, ...data } as Preferences);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user?.uid]);

  // Aplicar tema ao documento raiz
  useEffect(() => {
    const root = document.documentElement;
    let theme = prefs.theme;

    // Se for "auto", detecta o tema do sistema
    if (prefs.theme === "auto") {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      theme = prefersLight ? "light" : "dark";
    }

    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [prefs.theme]);

  // Aplicar densidade de conteúdo
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-density", prefs.density);
  }, [prefs.density]);

  // Aplicar tamanho da fonte
  useEffect(() => {
    const root = document.documentElement;
    const fontSizes = {
      small: "0.875rem",
      normal: "1rem",
      large: "1.125rem",
    };
    root.style.fontSize = fontSizes[prefs.fontSize];
  }, [prefs.fontSize]);

  // Aplicar idioma
  useEffect(() => {
    document.documentElement.lang = prefs.language;
  }, [prefs.language]);

  // Aplicar modo de animações
  useEffect(() => {
    if (!prefs.animationsEnabled) {
      document.documentElement.style.setProperty("--animation-duration", "0ms");
    } else {
      document.documentElement.style.setProperty("--animation-duration", "300ms");
    }
  }, [prefs.animationsEnabled]);

  const handleSetPrefs = async (newPrefs: Partial<Preferences>) => {
    const updatedPrefs = { ...prefs, ...newPrefs };
    setPrefs(updatedPrefs);
    
    if (user?.uid) {
      try {
        await setUserPreferences(user.uid, updatedPrefs);
      } catch (error) {
        console.error("Erro ao salvar preferências:", error);
      }
    }
  };

  const clearHistory = async () => {
    // localStorage.removeItem("hasSeenWelcome");
    // Aqui você pode implementar limpeza de histórico quando tiver uma tabela de histórico
    console.log("Histórico limpo");
  };

  return (
    <PreferencesContext.Provider
      value={{
        ...prefs,
        setPrefs: handleSetPrefs,
        isLoading,
        clearHistory,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
