// Preferences
export interface UserPreferences {
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

export async function getUserPreferences(uid: string): Promise<UserPreferences | null> {
  const snap = await getDoc(doc(db, "users", uid, "preferences", "main"));
  return snap.exists() ? (snap.data() as UserPreferences) : null;
}

export async function setUserPreferences(uid: string, prefs: UserPreferences) {
  await setDoc(doc(db, "users", uid, "preferences", "main"), prefs, { merge: true });
}
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Expense {
  id?: string;
  amount: number;
  category: string;
  date: Timestamp | Date;
  description: string;
}

export interface UserProfile {
  salary: number;
  createdAt: Timestamp;
}

// User profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserSalary(uid: string, salary: number) {
  await setDoc(doc(db, "users", uid), { salary }, { merge: true });
}

// Expenses
export async function getExpenses(uid: string): Promise<Expense[]> {
  const q = query(
    collection(db, "users", uid, "expenses"),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expense));
}

export async function addExpense(uid: string, expense: Omit<Expense, "id">) {
  return addDoc(collection(db, "users", uid, "expenses"), {
    ...expense,
    date: expense.date instanceof Date ? Timestamp.fromDate(expense.date) : expense.date,
  });
}

export async function deleteExpense(uid: string, expenseId: string) {
  await deleteDoc(doc(db, "users", uid, "expenses", expenseId));
}

export async function updateExpense(
  uid: string,
  expenseId: string,
  data: Partial<Omit<Expense, "id">>
) {
  await updateDoc(doc(db, "users", uid, "expenses", expenseId), data);
}
