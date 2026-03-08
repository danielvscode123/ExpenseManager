import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converte data de qualquer formato (Date, Firestore Timestamp, string) para Date
 */
export function toDate(date: any): Date {
  if (date instanceof Date) {
    return date;
  }
  // Firestore Timestamp com método toDate()
  if (date && typeof date.toDate === 'function') {
    return date.toDate();
  }
  // Firestore Timestamp objeto plano com propriedade seconds
  if (date instanceof Object && 'seconds' in date) {
    return new Date((date as any).seconds * 1000);
  }
  // String ou outro tipo
  try {
    return new Date(date);
  } catch {
    return new Date();
  }
}
