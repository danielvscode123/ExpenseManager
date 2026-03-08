import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSmartNotification } from "@/hooks/useSmartNotification";
import { useTranslation } from "@/hooks/useTranslation";
import { useFormatting } from "@/hooks/useFormatting";

import { categoryOptions } from "@/lib/categories";

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: {
    amount: number;
    category: string;
    date: Date;
    description: string;
  }) => Promise<void>;
}

export function ExpenseModal({ open, onClose, onSave }: ExpenseModalProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = useSmartNotification();
  const { t } = useTranslation();
  const { currencySymbol } = useFormatting();

  useEffect(() => {
    if (!open) {
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().substr(0, 10));
      setDescription("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount.replace(/,/g, "."));
    if (isNaN(value) || value <= 0) {
      notify.error(t("expense-invalid-amount"));
      return;
    }
    if (!category) {
      notify.error(t("expense-invalid-category"));
      return;
    }

    setLoading(true);
    try {
      await onSave({
        amount: value,
        category,
        date: new Date(date),
        description,
      });
      notify.success(t("expense-saved"));
      onClose();
    } catch (err) {
      console.error(err);
      notify.error(t("expense-error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("expense-modal-title")}</DialogTitle>
          <DialogDescription>{t("expense-modal-description")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">{t("expense-amount-label").replace("(R$)", `(${currencySymbol})`).replace("(USD)", `(${currencySymbol})`).replace("(EUR)", `(${currencySymbol})`)}</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder={t("expense-amount-placeholder")}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t("expense-category-label")}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder={t("expense-category-placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {t(c.value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">{t("expense-date-label")}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("expense-description-label")}</Label>
            <Textarea
              id="description"
              placeholder={t("expense-description-placeholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("uploading") : t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
