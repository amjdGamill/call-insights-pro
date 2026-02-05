import { 
  Mic, 
  Volume2, 
  Palette, 
  Info,
  ChevronLeft,
  Trash2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AudioQualityDialog } from "@/components/settings/AudioQualityDialog";
import { ThemeDialog } from "@/components/settings/ThemeDialog";
import { DeleteConfirmDialog } from "@/components/settings/DeleteConfirmDialog";
import { AboutDialog } from "@/components/settings/AboutDialog";
import { useTheme } from "@/components/ThemeProvider";
import { useSettings } from "@/hooks/useSettings";
 import { useRecordings } from "@/hooks/useRecordings";
 import { ProUpgradeButton } from "@/components/ProUpgradeButton";
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
  const { settings, updateSettings } = useSettings();
  const { deleteAllRecordings } = useRecordings();
  
  // Dialog states
  const [audioQualityOpen, setAudioQualityOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleToggle = (id: string) => {
    if (id === "auto-record") {
      updateSettings({ autoRecord: !settings.autoRecord });
    }
  };

  const handleAudioQualityChange = (quality: string) => {
    updateSettings({ audioQuality: quality as "low" | "medium" | "high" | "ultra" });
  };

  const handleDeleteAll = () => {
    deleteAllRecordings();
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
          checked: settings.autoRecord,
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
          description: audioQualityLabels[settings.audioQuality],
          type: "link" as const,
          color: "bg-accent/10 text-accent",
        },
      ],
    },
    {
      title: "التخزين",
      items: [
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
         <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
           <ProUpgradeButton />
         </div>
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
                        checked={item.checked ?? false}
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
        value={settings.audioQuality}
        onValueChange={handleAudioQualityChange}
      />
      <ThemeDialog open={themeOpen} onOpenChange={setThemeOpen} />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteAll}
      />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </div>
  );
}
