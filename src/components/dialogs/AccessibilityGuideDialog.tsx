import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, ChevronLeft, Search, ToggleRight, CheckCircle2 } from "lucide-react";

interface AccessibilityGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const steps = [
  {
    icon: Settings,
    title: "افتح الإعدادات",
    description: "اذهب إلى إعدادات الهاتف الرئيسية",
  },
  {
    icon: Search,
    title: "ابحث عن إمكانية الوصول",
    description: "ابحث عن 'إمكانية الوصول' أو 'Accessibility' في الإعدادات",
  },
  {
    icon: ChevronLeft,
    title: "اختر التطبيقات المثبتة",
    description: "اضغط على 'التطبيقات المثبتة' أو 'Installed apps' أو 'Downloaded services'",
  },
  {
    icon: ToggleRight,
    title: "فعّل مسجل المكالمات",
    description: "ابحث عن 'مسجل المكالمات' وقم بتفعيله",
  },
  {
    icon: CheckCircle2,
    title: "اضغط موافق",
    description: "وافق على رسالة التأكيد لإتمام التفعيل",
  },
];

export function AccessibilityGuideDialog({
  open,
  onOpenChange,
  onComplete,
}: AccessibilityGuideDialogProps) {
  const handleOpenSettings = () => {
    // In real app with Capacitor, this would open accessibility settings
    // For now, simulate completion
    onComplete();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">تفعيل خدمة إمكانية الوصول</DialogTitle>
          <DialogDescription>
            هذه الخدمة مطلوبة لتسجيل المكالمات على أندرويد 10 والإصدارات الأحدث
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Note */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm text-amber-600 dark:text-amber-400">
              ⚠️ بدون هذه الصلاحية، لن يتمكن التطبيق من تسجيل صوت الطرف الآخر في المكالمة
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground text-sm">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Guide */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">
              المسار في معظم أجهزة أندرويد:
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-foreground flex-wrap">
              <span className="px-2 py-1 bg-muted rounded">الإعدادات</span>
              <ChevronLeft className="w-3 h-3 rotate-180" />
              <span className="px-2 py-1 bg-muted rounded">إمكانية الوصول</span>
              <ChevronLeft className="w-3 h-3 rotate-180" />
              <span className="px-2 py-1 bg-muted rounded">التطبيقات</span>
              <ChevronLeft className="w-3 h-3 rotate-180" />
              <span className="px-2 py-1 bg-primary text-primary-foreground rounded">مسجل المكالمات</span>
            </div>
          </div>

          {/* Note about different phones */}
          <p className="text-xs text-muted-foreground text-center">
            ملاحظة: قد يختلف المسار قليلاً حسب نوع الجهاز (Samsung, Xiaomi, Huawei, etc.)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleOpenSettings} className="w-full">
            <Settings className="w-4 h-4 ml-2" />
            فتح إعدادات إمكانية الوصول
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            لاحقاً
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
