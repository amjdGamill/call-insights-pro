import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileAudio, FolderArchive, Share2 } from "lucide-react";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const exportOptions = [
  {
    id: "single",
    icon: FileAudio,
    label: "تصدير تسجيل واحد",
    description: "اختر تسجيلاً لتصديره",
  },
  {
    id: "all",
    icon: FolderArchive,
    label: "تصدير جميع التسجيلات",
    description: "تصدير كملف مضغوط",
  },
  {
    id: "share",
    icon: Share2,
    label: "مشاركة التسجيلات",
    description: "مشاركة عبر التطبيقات",
  },
];

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const handleExport = (type: string) => {
    // Handle export logic here
    console.log("Export type:", type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">تصدير التسجيلات</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {exportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant="outline"
                className="w-full h-auto p-4 flex items-center gap-4 justify-start"
                onClick={() => handleExport(option.id)}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
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
