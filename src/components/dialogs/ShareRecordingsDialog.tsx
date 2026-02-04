import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Copy, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";

interface ShareRecordingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onShare: (method: "copy" | "whatsapp" | "email") => void;
}

export function ShareRecordingsDialog({
  open,
  onOpenChange,
  selectedCount,
  onShare,
}: ShareRecordingsDialogProps) {
  const handleShare = (method: "copy" | "whatsapp" | "email") => {
    onShare(method);
    onOpenChange(false);
    toast.success("تمت المشاركة بنجاح");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Share2 className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center">
            مشاركة {selectedCount} تسجيل
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <button
            onClick={() => handleShare("copy")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Copy className="w-5 h-5 text-foreground" />
            </div>
            <span className="font-medium">نسخ الرابط</span>
          </button>
          
          <button
            onClick={() => handleShare("whatsapp")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-500" />
            </div>
            <span className="font-medium">واتساب</span>
          </button>
          
          <button
            onClick={() => handleShare("email")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-medium">البريد الإلكتروني</span>
          </button>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
