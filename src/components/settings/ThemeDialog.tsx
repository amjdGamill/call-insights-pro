import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themes = [
  { id: "light", label: "فاتح", icon: Sun },
  { id: "dark", label: "داكن", icon: Moon },
  { id: "system", label: "تلقائي", icon: Monitor },
];

export function ThemeDialog({ open, onOpenChange }: ThemeDialogProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">المظهر</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={theme}
          onValueChange={(val) => {
            setTheme(val as "light" | "dark" | "system");
            onOpenChange(false);
          }}
          className="space-y-3"
        >
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <div
                key={themeOption.id}
                className="flex items-center space-x-3 space-x-reverse p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => {
                  setTheme(themeOption.id as "light" | "dark" | "system");
                  onOpenChange(false);
                }}
              >
                <RadioGroupItem value={themeOption.id} id={themeOption.id} />
                <Label
                  htmlFor={themeOption.id}
                  className="flex-1 flex items-center gap-3 cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{themeOption.label}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}
