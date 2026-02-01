import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AudioQualityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
}

const audioQualities = [
  { id: "low", label: "منخفضة", description: "64 kbps - حجم أصغر" },
  { id: "medium", label: "متوسطة", description: "96 kbps - توازن جيد" },
  { id: "high", label: "عالية", description: "128 kbps - جودة ممتازة" },
  { id: "ultra", label: "فائقة", description: "256 kbps - أعلى جودة" },
];

export function AudioQualityDialog({
  open,
  onOpenChange,
  value,
  onValueChange,
}: AudioQualityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">جودة الصوت</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={value}
          onValueChange={(val) => {
            onValueChange(val);
            onOpenChange(false);
          }}
          className="space-y-3"
        >
          {audioQualities.map((quality) => (
            <div
              key={quality.id}
              className="flex items-center space-x-3 space-x-reverse p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => {
                onValueChange(quality.id);
                onOpenChange(false);
              }}
            >
              <RadioGroupItem value={quality.id} id={quality.id} />
              <Label htmlFor={quality.id} className="flex-1 cursor-pointer">
                <div className="font-medium">{quality.label}</div>
                <div className="text-sm text-muted-foreground">
                  {quality.description}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}
