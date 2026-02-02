import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Play } from "lucide-react";

export interface Call {
  id: string;
  name: string;
  number: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  date: string;
  time: string;
  isFavorite: boolean;
  isRecorded: boolean;
}

interface CallCardProps {
  call: Call;
  onPlay?: () => void;
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

export function CallCard({ call, onPlay }: CallCardProps) {
  const TypeIcon = typeIcons[call.type];
  const typeColor = typeColors[call.type];

  return (
    <div className="call-card animate-slide-up">
      <div className="flex items-center gap-4">
        {/* Avatar */}
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

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{call.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{call.time}</span>
            {call.isRecorded && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground font-medium">{call.duration}</span>
              </>
            )}
          </div>
        </div>

        {/* Play Button */}
        {call.isRecorded && (
          <button
            onClick={onPlay}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
          >
            <Play className="w-5 h-5 mr-[-2px]" />
          </button>
        )}
      </div>
    </div>
  );
}
