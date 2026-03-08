export const categoryOptions = [
  { value: "home", label: "Moradia" },
  { value: "food", label: "Alimentação" },
  { value: "transport", label: "Transporte" },
  { value: "work", label: "Trabalho" },
  { value: "shopping", label: "Compras" },
  { value: "gift", label: "Presente" },
  { value: "other", label: "Outros" },
];

export function labelForCategory(value: string) {
  return categoryOptions.find((c) => c.value === value)?.label || value;
}
