import { usePreferences } from "@/contexts/PreferencesContext";
import { useMemo } from "react";

/**
 * Hook para aplicar estilos de formatação baseado em preferências
 */
export function useFormatting() {
  const prefs = usePreferences();

  // Taxas de câmbio (relativo ao USD = 1)
  const EXCHANGE_RATES = {
    BRL: 4.97,    // 1 USD = 4.97 BRL
    USD: 1,       // Moeda base
    EUR: 0.92,    // 1 USD = 0.92 EUR
  };

  // Dicionário de símbolos de moeda
  const currencySymbols = {
    BRL: "R$",
    USD: "$",
    EUR: "€",
  };

  // Dicionário de separadores por idioma
  const formatters = {
    "pt-BR": { decimal: ",", thousand: "." },
    "en-US": { decimal: ".", thousand: "," },
    "es-ES": { decimal: ",", thousand: "." },
  };

  /**
   * Converte valor entre moedas
   */
  const convertCurrency = (
    value: number, 
    fromCurrency: "BRL" | "USD" | "EUR", 
    toCurrency: "BRL" | "USD" | "EUR"
  ): number => {
    if (fromCurrency === toCurrency) return value;
    // Converter para USD primeiro, depois para a moeda alvo
    const valueInUSD = value / EXCHANGE_RATES[fromCurrency];
    return valueInUSD * EXCHANGE_RATES[toCurrency];
  };

  /**
   * Formata um número como moeda
   */
  const formatCurrency = (
    value: number, 
    sourceCurrency: "BRL" | "USD" | "EUR" = "BRL"
  ): string => {
    // Converter valor para a moeda de exibição
    const convertedValue = convertCurrency(value, sourceCurrency, prefs.currency);
    
    const symbol = currencySymbols[prefs.currency];
    const formatter = formatters[prefs.language];

    const absValue = Math.abs(convertedValue).toFixed(2);
    const [integerPart, decimalPart] = absValue.split(".");

    // Adicionar separador de milhares
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, formatter.thousand);
    const formattedValue = `${formattedInteger}${formatter.decimal}${decimalPart}`;

    // Aplicar sinal de negativo se necessário
    const prefix = convertedValue < 0 ? "-" : "";
    const formatted = `${prefix}${symbol} ${formattedValue}`;

    return formatted;
  };

  /**
   * Formata um número percentual
   */
  const formatPercentage = (value: number): string => {
    const fixed = value.toFixed(1);
    return `${fixed}%`;
  };

  /**
   * Retorna classe CSS para valores em negrito
   */
  const getBoldClass = () => {
    return prefs.boldValues ? "font-bold" : "font-medium";
  };

  /**
   * Formata datas baseado no idioma
   */
  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const locales = {
      "pt-BR": "pt-BR",
      "en-US": "en-US",
      "es-ES": "es-ES",
    };

    return dateObj.toLocaleDateString(locales[prefs.language], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Retorna string de idioma para a aplicação
   */
  const getLanguageLabel = (): string => {
    const labels = {
      "pt-BR": "Português (Brasil)",
      "en-US": "English (United States)",
      "es-ES": "Español (España)",
    };
    return labels[prefs.language];
  };

  return {
    formatCurrency,
    convertCurrency,
    formatPercentage,
    getBoldClass,
    formatDate,
    getLanguageLabel,
    currencySymbol: currencySymbols[prefs.currency],
  };
}
