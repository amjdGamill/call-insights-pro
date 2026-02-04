import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteMultipleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  selectedCount: number;
}

export function DeleteMultipleDialog({
  open,
  onOpenChange,
  onConfirm,
  selectedCount,
}: DeleteMultipleDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm mx-4 rounded-2xl">
        <AlertDialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Trash2 className="w-8 h-8 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">
            حذف {selectedCount} تسجيل؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            سيتم حذف التسجيلات المحددة نهائياً ولن تتمكن من استرجاعها.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:flex-row">
          <AlertDialogCancel className="flex-1 mt-0">إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            حذف الكل
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
