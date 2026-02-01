import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Phone className="w-10 h-10 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            مسجل المكالمات
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">الإصدار 1.0.0</p>
            <p className="text-sm text-muted-foreground">
              تطبيق احترافي لتسجيل المكالمات الهاتفية بجودة عالية
            </p>
          </div>
          
          <div className="pt-4 border-t border-border space-y-2">
            <h4 className="font-medium text-sm">المميزات</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ تسجيل تلقائي للمكالمات</li>
              <li>✓ جودة صوت عالية</li>
              <li>✓ نسخ احتياطي سحابي</li>
              <li>✓ حماية بكلمة مرور</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © 2024 جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
