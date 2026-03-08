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
import { useSmartNotification } from "@/hooks/useSmartNotification";
import { useTranslation } from "@/hooks/useTranslation";
import { useFormatting } from "@/hooks/useFormatting";

interface SalaryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (salary: number) => Promise<void>;
}

export function SalaryModal({ open, onClose, onSubmit }: SalaryModalProps) {
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = useSmartNotification();
  const { t } = useTranslation();
  const { currencySymbol } = useFormatting();

  useEffect(() => {
    if (!open) {
      setSalary("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(salary.replace(/,/g, "."));
    if (isNaN(value) || value <= 0) {
      notify.error(t("salary-invalid"));
      return;
    }

    setLoading(true);
    try {
      await onSubmit(value);
      notify.success(t("salary-saved"));
      onClose();
    } catch (err) {
      console.error(err);
      notify.error(t("salary-error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("salary-modal-title")}</DialogTitle>
          <DialogDescription>
            {t("salary-modal-description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary">{t("salary-input-label").replace("(R$)", `(${currencySymbol})`).replace("(USD)", `(${currencySymbol})`).replace("(EUR)", `(${currencySymbol})`)}</Label>
            <Input
              id="salary"
              type="number"
              step="0.01"
              placeholder={t("salary-placeholder")}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
