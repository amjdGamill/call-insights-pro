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

interface PermissionsScreenProps {
  onComplete: () => void;
}

export function PermissionsScreen({ onComplete }: PermissionsScreenProps) {
  const [grantedPermissions, setGrantedPermissions] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const handleGrantPermission = (permissionId: string) => {
    // In real app, this would request actual permissions via Capacitor
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">الصلاحيات المطلوبة</h1>
        <p className="text-muted-foreground text-sm">
          نحتاج بعض الصلاحيات لتسجيل مكالماتك بشكل صحيح
        </p>
      </header>

      {/* Permissions List */}
      <div className="flex-1 px-5 overflow-y-auto pb-4">
        <div className="space-y-3">
          {permissions.map((permission, index) => {
            const Icon = permission.icon;
            const isGranted = grantedPermissions.has(permission.id);
            const isCurrent = index === currentStep && !isGranted;
            const isAccessibility = permission.id === "accessibility";

            return (
              <div
                key={permission.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isGranted
                    ? "bg-primary/5 border-primary/30"
                    : isCurrent
                    ? "bg-card border-primary shadow-lg"
                    : "bg-card/50 border-border/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isGranted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isGranted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {permission.title}
                      </h3>
                      {permission.required && !isGranted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                          مطلوب
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {permission.description}
                    </p>

                    {/* Accessibility Steps - Shown inline */}
                    {isAccessibility && !isGranted && isCurrent && (
                      <div className="mt-4 space-y-2">
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-3">
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            ⚠️ بدون هذه الصلاحية، لن يتمكن التطبيق من تسجيل صوت الطرف الآخر
                          </p>
                        </div>
                        
                        {accessibilitySteps.map((step, stepIndex) => {
                          const StepIcon = step.icon;
                          return (
                            <div
                              key={stepIndex}
                              className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                            >
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-primary">{stepIndex + 1}</span>
                              </div>
                              <StepIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-foreground">{step.title}</span>
                                <span className="text-xs text-muted-foreground mr-2">- {step.description}</span>
                              </div>
                            </div>
                          );
                        })}

                        <div className="p-2 rounded-lg bg-muted/30 mt-2">
                          <p className="text-xs text-muted-foreground text-center">
                            المسار: الإعدادات ← إمكانية الوصول ← التطبيقات ← مسجل المكالمات
                          </p>
                        </div>
                      </div>
                    )}

                    {!isGranted && isCurrent && (
                      <Button
                        onClick={() => handleGrantPermission(permission.id)}
                        className="mt-3 w-full"
                        size="sm"
                      >
                        <ChevronLeft className="w-4 h-4 ml-2" />
                        {isAccessibility ? "فتح إعدادات إمكانية الوصول" : "منح الصلاحية"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 space-y-3 bg-background border-t border-border/50">
        {!allRequiredGranted && (
          <Button
            onClick={handleGrantAll}
            variant="outline"
            className="w-full"
          >
            منح جميع الصلاحيات دفعة واحدة
          </Button>
        )}
        
        <Button
          onClick={onComplete}
          disabled={!allRequiredGranted}
          className="w-full"
          size="lg"
        >
          {allRequiredGranted ? "بدء استخدام التطبيق" : "يرجى منح الصلاحيات المطلوبة"}
        </Button>

        {!allRequiredGranted && (
          <p className="text-xs text-center text-muted-foreground">
            {grantedPermissions.size} من {permissions.length} صلاحيات ممنوحة
          </p>
        )}
      </div>
    </div>
  );
}
