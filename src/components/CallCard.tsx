import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Play, Check } from "lucide-react";
import { useState } from "react";
import { AudioPlayerDialog } from "@/components/dialogs/AudioPlayerDialog";

export interface Call {
  id: string;
  name: string;
  number: string;
  type: "incoming" | "outgoing" | "missed";
  formattedDuration: string;
  formattedDate: string;
  formattedTime: string;
  isRecorded: boolean;
}

interface CallCardProps {
  call: Call;
  isSelectionMode: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const typeIcons = {
  incoming: PhoneIncoming,
  outgoing: PhoneOutgoing,
  missed: PhoneMissed,
};

const typeColors = {
  incoming: "text-call-incoming",
  outgoing: "text-call-outgoing",
  missed: "text-call-missed",
};

export function CallCard({ call, isSelectionMode, isSelected, onToggleSelect }: CallCardProps) {
  const TypeIcon = typeIcons[call.type];
  const typeColor = typeColors[call.type];
  const [playerDialogOpen, setPlayerDialogOpen] = useState(false);

  const handleCardClick = () => {
    if (isSelectionMode) {
      onToggleSelect(call.id);
    }
  };

  const handleLongPress = () => {
    if (!isSelectionMode) {
      onToggleSelect(call.id);
    }
  };

  return (
    <>
      <div 
        className={`call-card animate-slide-up cursor-pointer ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}
        onClick={handleCardClick}
        onContextMenu={(e) => {
          e.preventDefault();
          handleLongPress();
        }}
      >
        <div className="flex items-center gap-4">
          {/* Selection Checkbox or Avatar */}
          {isSelectionMode ? (
            <div 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isSelected 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary border-2 border-border'
              }`}
            >
              {isSelected && <Check className="w-6 h-6" />}
            </div>
          ) : (
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {call.name.charAt(0)}
                </span>
              </div>
              <div className={`absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-card flex items-center justify-center border-2 border-background ${typeColor}`}>
                <TypeIcon className="w-3 h-3" />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{call.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{call.formattedTime}</span>
              {call.isRecorded && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground font-medium">{call.formattedDuration}</span>
                </>
              )}
            </div>
          </div>

          {/* Play Button - Only show when not in selection mode */}
          {call.isRecorded && !isSelectionMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlayerDialogOpen(true);
              }}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
            >
              <Play className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>
      </div>

      {/* Audio Player Dialog */}
      <AudioPlayerDialog
        open={playerDialogOpen}
        onOpenChange={setPlayerDialogOpen}
        callerName={call.name}
        duration={call.formattedDuration}
      />
    </>
  );
}
