import { useState } from "react";
import { 
  Phone, 
  Mic, 
  Bell, 
  Shield, 
  Accessibility, 
  CheckCircle2,
  ChevronLeft,
  Smartphone,
  Settings,
  Search,
  ToggleRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Permission {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  required: boolean;
}

const permissions: Permission[] = [
  {
    id: "phone",
    icon: Phone,
    title: "الوصول للمكالمات",
    description: "للتعرف على المكالمات الواردة والصادرة وتسجيلها تلقائياً",
    required: true,
  },
  {
    id: "microphone",
    icon: Mic,
    title: "الميكروفون",
    description: "لتسجيل صوت المكالمات بجودة عالية",
    required: true,
  },
  {
    id: "notifications",
    icon: Bell,
    title: "الإشعارات",
    description: "لإعلامك عند بدء أو انتهاء التسجيل",
    required: true,
  },
  {
    id: "storage",
    icon: Smartphone,
    title: "التخزين",
    description: "لحفظ التسجيلات على جهازك",
    required: true,
  },
  {
    id: "accessibility",
    icon: Accessibility,
    title: "خدمات إمكانية الوصول",
    description: "مطلوب في أندرويد 10+ لتسجيل المكالمات بشكل صحيح",
    required: true,
  },
  {
    id: "overlay",
    icon: Shield,
    title: "العرض فوق التطبيقات",
    description: "لعرض مؤشر التسجيل أثناء المكالمة",
    required: false,
  },
];

const accessibilitySteps = [
  {
    icon: Settings,
    title: "افتح الإعدادات",
    description: "اذهب إلى إعدادات الهاتف الرئيسية",
  },
  {
    icon: Search,
    title: "ابحث عن إمكانية الوصول",
    description: "ابحث عن 'إمكانية الوصول' أو 'Accessibility'",
  },
  {
    icon: ChevronLeft,
    title: "اختر التطبيقات المثبتة",
    description: "'التطبيقات المثبتة' أو 'Installed apps'",
  },
  {
    icon: ToggleRight,
    title: "فعّل مسجل المكالمات",
    description: "ابحث عن 'مسجل المكالمات' وقم بتفعيله",
  },
  {
    icon: CheckCircle2,
    title: "اضغط موافق",
    description: "وافق على رسالة التأكيد",
  },
];

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PermissionsDialog({ open, onOpenChange }: PermissionsDialogProps) {
  const [grantedPermissions, setGrantedPermissions] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const handleGrantPermission = (permissionId: string) => {
    setGrantedPermissions((prev) => new Set([...prev, permissionId]));
    
    if (currentStep < permissions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGrantAll = () => {
    const allIds = permissions.map(p => p.id);
    setGrantedPermissions(new Set(allIds));
  };

  const requiredPermissions = permissions.filter(p => p.required);
  const allRequiredGranted = requiredPermissions.every(p => grantedPermissions.has(p.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">الصلاحيات المطلوبة</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                صلاحيات تشغيل التسجيل
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Permissions List */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-3">
            {permissions.map((permission, index) => {
              const Icon = permission.icon;
              const isGranted = grantedPermissions.has(permission.id);
              const isCurrent = index === currentStep && !isGranted;
              const isAccessibility = permission.id === "accessibility";

              return (
                <div
                  key={permission.id}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    isGranted
                      ? "bg-primary/5 border-primary/30"
                      : isCurrent
                      ? "bg-card border-primary shadow-lg"
                      : "bg-card/50 border-border/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                        isGranted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isGranted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-sm">
                          {permission.title}
                        </h3>
                        {permission.required && !isGranted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                            مطلوب
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {permission.description}
                      </p>

                      {/* Accessibility Steps */}
                      {isAccessibility && !isGranted && isCurrent && (
                        <div className="mt-3 space-y-2">
                          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <p className="text-xs text-amber-600 dark:text-amber-400">
                              ⚠️ بدون هذه الصلاحية، لن يتمكن التطبيق من تسجيل صوت الطرف الآخر
                            </p>
                          </div>
                          
                          {accessibilitySteps.map((step, stepIndex) => {
                            const StepIcon = step.icon;
                            return (
                              <div
                                key={stepIndex}
                                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                              >
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-bold text-primary">{stepIndex + 1}</span>
                                </div>
                                <StepIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs font-medium text-foreground">{step.title}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {!isGranted && isCurrent && (
                        <Button
                          onClick={() => handleGrantPermission(permission.id)}
                          className="mt-2 w-full"
                          size="sm"
                        >
                          <ChevronLeft className="w-4 h-4 ml-2" />
                          {isAccessibility ? "فتح الإعدادات" : "منح الصلاحية"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 space-y-2 border-t border-border/50 bg-background">
          {!allRequiredGranted && (
            <Button
              onClick={handleGrantAll}
              variant="outline"
              className="w-full"
              size="sm"
            >
              منح جميع الصلاحيات
            </Button>
          )}
          
          <Button
            onClick={() => onOpenChange(false)}
            disabled={!allRequiredGranted}
            className="w-full"
            size="sm"
          >
            {allRequiredGranted ? "تم" : `${grantedPermissions.size}/${permissions.length} صلاحيات`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
