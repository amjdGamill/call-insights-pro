import { 
  Mic, 
  Volume2, 
  Bell, 
  Shield, 
  Cloud, 
  Palette, 
  HelpCircle, 
  Info,
  ChevronLeft,
  Phone,
  Trash2,
  Download
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SettingItem {
  id: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  type: "toggle" | "link" | "action";
  color: string;
  defaultValue?: boolean;
}

const settingSections = [
  {
    title: "التسجيل",
    items: [
      {
        id: "auto-record",
        icon: Mic,
        label: "التسجيل التلقائي",
        description: "تسجيل جميع المكالمات تلقائياً",
        type: "toggle" as const,
        color: "bg-primary/10 text-primary",
        defaultValue: true,
      },
      {
        id: "record-incoming",
        icon: Phone,
        label: "تسجيل المكالمات الواردة",
        type: "toggle" as const,
        color: "bg-call-incoming/10 text-call-incoming",
        defaultValue: true,
      },
      {
        id: "record-outgoing",
        icon: Phone,
        label: "تسجيل المكالمات الصادرة",
        type: "toggle" as const,
        color: "bg-call-outgoing/10 text-call-outgoing",
        defaultValue: true,
      },
    ],
  },
  {
    title: "الصوت",
    items: [
      {
        id: "audio-quality",
        icon: Volume2,
        label: "جودة الصوت",
        description: "عالية (128 kbps)",
        type: "link" as const,
        color: "bg-accent/10 text-accent",
      },
    ],
  },
  {
    title: "الإشعارات",
    items: [
      {
        id: "notifications",
        icon: Bell,
        label: "الإشعارات",
        description: "تنبيهات عند بدء التسجيل",
        type: "toggle" as const,
        color: "bg-warning/10 text-warning",
        defaultValue: true,
      },
    ],
  },
  {
    title: "التخزين",
    items: [
      {
        id: "cloud-backup",
        icon: Cloud,
        label: "النسخ الاحتياطي السحابي",
        description: "مزامنة التسجيلات مع السحابة",
        type: "toggle" as const,
        color: "bg-primary/10 text-primary",
        defaultValue: false,
      },
      {
        id: "export",
        icon: Download,
        label: "تصدير التسجيلات",
        type: "link" as const,
        color: "bg-success/10 text-success",
      },
      {
        id: "delete-all",
        icon: Trash2,
        label: "حذف جميع التسجيلات",
        type: "action" as const,
        color: "bg-destructive/10 text-destructive",
      },
    ],
  },
  {
    title: "الخصوصية والأمان",
    items: [
      {
        id: "password",
        icon: Shield,
        label: "قفل التطبيق",
        description: "حماية التسجيلات بكلمة مرور",
        type: "toggle" as const,
        color: "bg-primary/10 text-primary",
        defaultValue: false,
      },
    ],
  },
  {
    title: "أخرى",
    items: [
      {
        id: "theme",
        icon: Palette,
        label: "المظهر",
        description: "فاتح",
        type: "link" as const,
        color: "bg-accent/10 text-accent",
      },
      {
        id: "help",
        icon: HelpCircle,
        label: "المساعدة والدعم",
        type: "link" as const,
        color: "bg-muted text-muted-foreground",
      },
      {
        id: "about",
        icon: Info,
        label: "حول التطبيق",
        description: "الإصدار 1.0.0",
        type: "link" as const,
        color: "bg-muted text-muted-foreground",
      },
    ],
  },
];

export function SettingsScreen() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string, defaultValue?: boolean) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : !defaultValue,
    }));
  };

  const getToggleValue = (id: string, defaultValue?: boolean) => {
    return toggleStates[id] !== undefined ? toggleStates[id] : defaultValue;
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground mt-1">تخصيص تجربة التطبيق</p>
      </header>

      {/* Settings Sections */}
      <div className="px-5 space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="animate-slide-up"
            style={{ animationDelay: `${sectionIndex * 0.1}s` }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              {section.title}
            </h2>
            <div className="glass-card overflow-hidden divide-y divide-border/50">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{item.label}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                    {item.type === "toggle" && (
                      <Switch
                        checked={getToggleValue(item.id, item.defaultValue)}
                        onCheckedChange={() => handleToggle(item.id, item.defaultValue)}
                      />
                    )}
                    {item.type === "link" && (
                      <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="px-5 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          تسجيل المكالمات © 2024
        </p>
      </div>
    </div>
  );
}
