import { usePreferences } from "@/contexts/PreferencesContext";
import { getTranslation } from "@/lib/i18n";
import { useCallback } from "react";

/**
 * Hook para usar traduções baseado no idioma selecionado
 */
export function useTranslation() {
  const prefs = usePreferences();

  const t = useCallback(
    (key: string): string => {
      return getTranslation(prefs.language, key);
    },
    [prefs.language]
  );

  return { t, language: prefs.language };
}
