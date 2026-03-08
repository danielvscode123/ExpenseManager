/**
 * Sistema de Internacionalização (i18n)
 * Suporta: pt-BR, en-US, es-ES
 */

export type Language = "pt-BR" | "en-US" | "es-ES";

export const translations = {
  "pt-BR": {
    // Títulos e Headers
    "overview": "Visão Geral",
    "settings": "Configurações",
    "transactions": "Transações",

    // Cards
    "total-balance": "Saldo Total",
    "salary": "Salário",
    "expenses": "Despesas",
    "savings": "Economia",
    "this-month": "este mês",

    // Modals - Salary
    "salary-modal-title": "Comece pelo seu salário",
    "salary-modal-description": "Antes de usar o painel, precisamos saber qual é o seu salário inicial.",
    "salary-input-label": "Salário inicial (R$)",
    "salary-placeholder": "Digite o valor",
    "salary-saved": "Salário inicial registrado!",
    "salary-invalid": "Informe um salário válido.",
    "salary-error": "Não foi possível salvar o salário.",
    "save": "Salvar",
    "saving": "Salvando...",

    // Modals - Expense
    "expense-modal-title": "Nova despesa",
    "expense-modal-description": "Registre sua despesa para acompanhar seus gastos.",
    "expense-amount-label": "Valor (R$)",
    "expense-amount-placeholder": "0,00",
    "expense-category-label": "Categoria",
    "expense-category-placeholder": "Selecione",
    "expense-date-label": "Data",
    "expense-description-label": "Descrição",
    "expense-description-placeholder": "Opcional",
    "expense-saved": "Despesa registrada!",
    "expense-invalid-amount": "Informe um valor válido.",
    "expense-invalid-category": "Selecione uma categoria.",
    "expense-error": "Erro ao salvar despesa.",
    "submit": "Enviar",
    "uploading": "Enviando...",

    // Settings - Theme
    "theme": "Tema",
    "light": "Claro",
    "dark": "Escuro",
    "auto": "Automático",

    // Settings - Layout
    "layout": "Layout",
    "density": "Densidade",
    "compact": "Compacto",
    "normal": "Normal",
    "spacious": "Espaçoso",
    "font-size": "Tamanho de Fonte",
    "small": "Pequeno",
    "large": "Grande",

    // Settings - Financial
    "financial": "Financeiro",
    "currency": "Moeda",
    "chart-period": "Período de Gráficos",
    "months-3": "3 Meses",
    "months-7": "7 Meses",
    "months-12": "12 Meses",
    "bold-values": "Valores em Negrito",

    // Settings - Language
    "language": "Idioma",
    "portuguese-br": "Português (Brasil)",
    "english-us": "English (USA)",
    "spanish-es": "Español (España)",

    // Settings - Notifications
    "notifications": "Notificações e Som",
    "enable-notifications": "Ativar Notificações",
    "notifications-description": "Receba avisos sobre suas ações",
    "enable-sound": "Ativar Som",
    "sound-description": "Sons de feedback para ações",

    // Settings - Experience
    "experience": "Experiência",
    "enable-animations": "Ativar Animações",
    "animations-description": "Efeitos visuais e transições suaves",
    "advanced-mode": "Modo Avançado",
    "advanced-mode-description": "Mostra opções adicionais na dashboard",

    // Settings - Data
    "data": "Dados",
    "export-preferences": "Exportar Preferências",
    "preferences-exported": "Preferências exportadas com sucesso!",
    "clear-history": "Limpar Histórico",
    "clear-history-confirm": "Tem certeza? Esta ação não pode ser desfeita.",
    "history-cleared": "Histórico limparado!",
    "cancel": "Cancelar",
    "confirm": "Confirmar",

    // Categories
    "food": "Alimentação",
    "transport": "Transporte",
    "entertainment": "Entretenimento",
    "utilities": "Serviços",
    "health": "Saúde",
    "education": "Educação",
    "other": "Outros",

    // Messages
    "no-description": "Sem descrição",
    "total-expenses": "Total de Despesas",
    "monthly-salary": "Salário Mensal",
    "loading": "Carregando...",
    "error": "Erro ao carregar dados",
    "try-again": "Tentar novamente",
  },

  "en-US": {
    // Titles and Headers
    "overview": "Overview",
    "settings": "Settings",
    "transactions": "Transactions",

    // Cards
    "total-balance": "Total Balance",
    "salary": "Salary",
    "expenses": "Expenses",
    "savings": "Savings",
    "this-month": "this month",

    // Modals - Salary
    "salary-modal-title": "Start with your salary",
    "salary-modal-description": "Before using the dashboard, we need to know your initial salary.",
    "salary-input-label": "Initial Salary (USD)",
    "salary-placeholder": "Enter the amount",
    "salary-saved": "Initial salary registered!",
    "salary-invalid": "Please enter a valid salary.",
    "salary-error": "Could not save salary.",
    "save": "Save",
    "saving": "Saving...",

    // Modals - Expense
    "expense-modal-title": "New Expense",
    "expense-modal-description": "Record your expense to track your spending.",
    "expense-amount-label": "Amount (USD)",
    "expense-amount-placeholder": "0.00",
    "expense-category-label": "Category",
    "expense-category-placeholder": "Select",
    "expense-date-label": "Date",
    "expense-description-label": "Description",
    "expense-description-placeholder": "Optional",
    "expense-saved": "Expense registered!",
    "expense-invalid-amount": "Please enter a valid amount.",
    "expense-invalid-category": "Please select a category.",
    "expense-error": "Error saving expense.",
    "submit": "Submit",
    "uploading": "Uploading...",

    // Settings - Theme
    "theme": "Theme",
    "light": "Light",
    "dark": "Dark",
    "auto": "Automatic",

    // Settings - Layout
    "layout": "Layout",
    "density": "Density",
    "compact": "Compact",
    "normal": "Normal",
    "spacious": "Spacious",
    "font-size": "Font Size",
    "small": "Small",
    "large": "Large",

    // Settings - Financial
    "financial": "Financial",
    "currency": "Currency",
    "chart-period": "Chart Period",
    "months-3": "3 Months",
    "months-7": "7 Months",
    "months-12": "12 Months",
    "bold-values": "Bold Values",

    // Settings - Language
    "language": "Language",
    "portuguese-br": "Portuguese (Brazil)",
    "english-us": "English (USA)",
    "spanish-es": "Spanish (Spain)",

    // Settings - Notifications
    "notifications": "Notifications & Sound",
    "enable-notifications": "Enable Notifications",
    "notifications-description": "Get alerts about your actions",
    "enable-sound": "Enable Sound",
    "sound-description": "Sound feedback for actions",

    // Settings - Experience
    "experience": "Experience",
    "enable-animations": "Enable Animations",
    "animations-description": "Visual effects and smooth transitions",
    "advanced-mode": "Advanced Mode",
    "advanced-mode-description": "Shows additional options in dashboard",

    // Settings - Data
    "data": "Data",
    "export-preferences": "Export Preferences",
    "preferences-exported": "Preferences exported successfully!",
    "clear-history": "Clear History",
    "clear-history-confirm": "Are you sure? This action cannot be undone.",
    "history-cleared": "History cleared!",
    "cancel": "Cancel",
    "confirm": "Confirm",

    // Categories
    "food": "Food",
    "transport": "Transportation",
    "entertainment": "Entertainment",
    "utilities": "Utilities",
    "health": "Health",
    "education": "Education",
    "other": "Other",

    // Messages
    "no-description": "No description",
    "total-expenses": "Total Expenses",
    "monthly-salary": "Monthly Salary",
    "loading": "Loading...",
    "error": "Error loading data",
    "try-again": "Try again",
  },

  "es-ES": {
    // Titles and Headers
    "overview": "Visión General",
    "settings": "Configuración",
    "transactions": "Transacciones",

    // Cards
    "total-balance": "Saldo Total",
    "salary": "Salario",
    "expenses": "Gastos",
    "savings": "Ahorros",
    "this-month": "este mes",

    // Modals - Salary
    "salary-modal-title": "Comience con su salario",
    "salary-modal-description": "Antes de usar el panel, necesitamos saber su salario inicial.",
    "salary-input-label": "Salario Inicial (EUR)",
    "salary-placeholder": "Ingrese el monto",
    "salary-saved": "¡Salario inicial registrado!",
    "salary-invalid": "Por favor, ingrese un salario válido.",
    "salary-error": "No se pudo guardar el salario.",
    "save": "Guardar",
    "saving": "Guardando...",

    // Modals - Expense
    "expense-modal-title": "Nuevo Gasto",
    "expense-modal-description": "Registre su gasto para hacer seguimiento de sus gastos.",
    "expense-amount-label": "Monto (EUR)",
    "expense-amount-placeholder": "0,00",
    "expense-category-label": "Categoría",
    "expense-category-placeholder": "Seleccionar",
    "expense-date-label": "Fecha",
    "expense-description-label": "Descripción",
    "expense-description-placeholder": "Opcional",
    "expense-saved": "¡Gasto registrado!",
    "expense-invalid-amount": "Por favor, ingrese un monto válido.",
    "expense-invalid-category": "Por favor, seleccione una categoría.",
    "expense-error": "Error al guardar gasto.",
    "submit": "Enviar",
    "uploading": "Enviando...",

    // Settings - Theme
    "theme": "Tema",
    "light": "Claro",
    "dark": "Oscuro",
    "auto": "Automático",

    // Settings - Layout
    "layout": "Diseño",
    "density": "Densidad",
    "compact": "Compacto",
    "normal": "Normal",
    "spacious": "Espacioso",
    "font-size": "Tamaño de Fuente",
    "small": "Pequeño",
    "large": "Grande",

    // Settings - Financial
    "financial": "Financiero",
    "currency": "Moneda",
    "chart-period": "Período de Gráficos",
    "months-3": "3 Meses",
    "months-7": "7 Meses",
    "months-12": "12 Meses",
    "bold-values": "Valores en Negrita",

    // Settings - Language
    "language": "Idioma",
    "portuguese-br": "Portugués (Brasil)",
    "english-us": "Inglés (USA)",
    "spanish-es": "Español (España)",

    // Settings - Notifications
    "notifications": "Notificaciones y Sonido",
    "enable-notifications": "Habilitar Notificaciones",
    "notifications-description": "Reciba alertas sobre sus acciones",
    "enable-sound": "Habilitar Sonido",
    "sound-description": "Retroalimentación de sonido para acciones",

    // Settings - Experience
    "experience": "Experiencia",
    "enable-animations": "Habilitar Animaciones",
    "animations-description": "Efectos visuales y transiciones suaves",
    "advanced-mode": "Modo Avanzado",
    "advanced-mode-description": "Muestra opciones adicionales en el panel",

    // Settings - Data
    "data": "Datos",
    "export-preferences": "Exportar Preferencias",
    "preferences-exported": "¡Preferencias exportadas correctamente!",
    "clear-history": "Borrar Historial",
    "clear-history-confirm": "¿Está seguro? Esta acción no se puede deshacer.",
    "history-cleared": "¡Historial borrado!",
    "cancel": "Cancelar",
    "confirm": "Confirmar",

    // Categories
    "food": "Alimentación",
    "transport": "Transporte",
    "entertainment": "Entretenimiento",
    "utilities": "Servicios",
    "health": "Salud",
    "education": "Educación",
    "other": "Otros",

    // Messages
    "no-description": "Sin descripción",
    "total-expenses": "Gastos Totales",
    "monthly-salary": "Salario Mensual",
    "loading": "Cargando...",
    "error": "Error al cargar datos",
    "try-again": "Intentar de nuevo",
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language][key as keyof typeof translations["pt-BR"]] || key;
}
