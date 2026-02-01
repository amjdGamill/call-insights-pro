import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, FileText, ExternalLink } from "lucide-react";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const helpOptions = [
  {
    id: "faq",
    icon: FileText,
    label: "الأسئلة الشائعة",
    description: "إجابات للأسئلة المتكررة",
  },
  {
    id: "contact",
    icon: Mail,
    label: "تواصل معنا",
    description: "إرسال رسالة للدعم",
  },
  {
    id: "feedback",
    icon: MessageCircle,
    label: "إرسال ملاحظات",
    description: "ساعدنا في تحسين التطبيق",
  },
  {
    id: "privacy",
    icon: ExternalLink,
    label: "سياسة الخصوصية",
    description: "اطلع على سياسة الخصوصية",
  },
];

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const handleAction = (id: string) => {
    console.log("Help action:", id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">المساعدة والدعم</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {helpOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant="outline"
                className="w-full h-auto p-4 flex items-center gap-4 justify-start"
                onClick={() => handleAction(option.id)}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-right">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
