import { 
  Mic, 
  Volume2, 
  Bell, 
  Shield, 
  Cloud, 
  Palette, 
   
  Info,
  ChevronLeft,
  Phone,
  Trash2,
  Download
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AudioQualityDialog } from "@/components/settings/AudioQualityDialog";
import { ThemeDialog } from "@/components/settings/ThemeDialog";
import { DeleteConfirmDialog } from "@/components/settings/DeleteConfirmDialog";
import { ExportDialog } from "@/components/settings/ExportDialog";

import { AboutDialog } from "@/components/settings/AboutDialog";
import { PasswordDialog } from "@/components/settings/PasswordDialog";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";

const audioQualityLabels: Record<string, string> = {
  low: "منخفضة (64 kbps)",
  medium: "متوسطة (96 kbps)",
  high: "عالية (128 kbps)",
  ultra: "فائقة (256 kbps)",
};

const themeLabels: Record<string, string> = {
  light: "فاتح",
  dark: "داكن",
  system: "تلقائي",
};

export function SettingsScreen() {
  const { theme } = useTheme();
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "auto-record": true,
    "record-incoming": true,
    "record-outgoing": true,
    "notifications": true,
    "cloud-backup": false,
    "password": false,
  });
  
  const [audioQuality, setAudioQuality] = useState("high");
  
  // Dialog states
  const [audioQualityOpen, setAudioQualityOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  
  const [aboutOpen, setAboutOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleToggle = (id: string) => {
    if (id === "password" && !toggleStates[id]) {
      setPasswordOpen(true);
      return;
    }
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePasswordSave = (password: string) => {
    console.log("Password saved:", password);
    setToggleStates((prev) => ({
      ...prev,
      password: true,
    }));
    toast.success("تم تفعيل قفل التطبيق");
  };

  const handleDeleteAll = () => {
    console.log("All recordings deleted");
    toast.success("تم حذف جميع التسجيلات");
    setDeleteOpen(false);
  };

  const handleItemClick = (id: string, type: string) => {
    if (type === "link") {
      switch (id) {
        case "audio-quality":
          setAudioQualityOpen(true);
          break;
        case "theme":
          setThemeOpen(true);
          break;
        case "export":
          setExportOpen(true);
          break;
        case "about":
          setAboutOpen(true);
          break;
      }
    } else if (type === "action") {
      if (id === "delete-all") {
        setDeleteOpen(true);
      }
    }
  };

  const getDescription = (id: string, originalDescription?: string) => {
    switch (id) {
      case "audio-quality":
        return audioQualityLabels[audioQuality];
      case "theme":
        return themeLabels[theme];
      default:
        return originalDescription;
    }
  };

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
        },
        {
          id: "record-incoming",
          icon: Phone,
          label: "تسجيل المكالمات الواردة",
          type: "toggle" as const,
          color: "bg-call-incoming/10 text-call-incoming",
        },
        {
          id: "record-outgoing",
          icon: Phone,
          label: "تسجيل المكالمات الصادرة",
          type: "toggle" as const,
          color: "bg-call-outgoing/10 text-call-outgoing",
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
          description: audioQualityLabels[audioQuality],
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
          description: toggleStates.password ? "مفعّل" : "حماية التسجيلات بكلمة مرور",
          type: "toggle" as const,
          color: "bg-primary/10 text-primary",
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
          description: themeLabels[theme],
          type: "link" as const,
          color: "bg-accent/10 text-accent",
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
                    onClick={() => {
                      if (item.type !== "toggle") {
                        handleItemClick(item.id, item.type);
                      }
                    }}
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
                        checked={toggleStates[item.id] ?? false}
                        onCheckedChange={() => handleToggle(item.id)}
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

      {/* Dialogs */}
      <AudioQualityDialog
        open={audioQualityOpen}
        onOpenChange={setAudioQualityOpen}
        value={audioQuality}
        onValueChange={setAudioQuality}
      />
      <ThemeDialog open={themeOpen} onOpenChange={setThemeOpen} />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteAll}
      />
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <PasswordDialog
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
        onSave={handlePasswordSave}
      />
    </div>
  );
}
