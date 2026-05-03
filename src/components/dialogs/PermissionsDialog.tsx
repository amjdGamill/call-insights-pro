import { PermissionsScreen } from "@/components/screens/PermissionsScreen";
import { X } from "lucide-react";

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PermissionsDialog({ open, onOpenChange }: PermissionsDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto animate-fade-in">
      <button
        onClick={() => onOpenChange(false)}
        className="fixed top-4 left-4 z-10 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="max-w-md mx-auto">
        <PermissionsScreen onComplete={() => onOpenChange(false)} />
      </div>
    </div>
  );
}
