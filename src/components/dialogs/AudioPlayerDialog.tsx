import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, Pause, Volume2, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callerName: string;
  duration: string;
  audioPath?: string;
}

export function AudioPlayerDialog({
  open,
  onOpenChange,
  callerName,
  duration,
  audioPath,
}: AudioPlayerDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Parse duration string to seconds
  useEffect(() => {
    const parts = duration.split(":").map(Number);
    if (parts.length === 2) {
      setTotalDuration(parts[0] * 60 + parts[1]);
    } else if (parts.length === 3) {
      setTotalDuration(parts[0] * 3600 + parts[1] * 60 + parts[2]);
    }
  }, [duration]);

  useEffect(() => {
    if (!open) {
      setIsPlaying(false);
      setCurrentTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [open]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsPlaying(true);
      // محاكاة التشغيل لعدم وجود ملف صوتي فعلي
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">تشغيل التسجيل</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {callerName.charAt(0)}
            </span>
          </div>

          {/* Caller Name */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">{callerName}</h3>
            <p className="text-sm text-muted-foreground">مدة التسجيل: {duration}</p>
          </div>

          {/* Waveform Visualization */}
          <div className="w-full h-16 flex items-center justify-center gap-1">
            {Array.from({ length: 40 }).map((_, i) => {
              const height = isPlaying
                ? 20 + Math.random() * 30
                : 15 + Math.sin(i * 0.5) * 10;
              return (
                <div
                  key={i}
                  className="w-1 bg-primary/60 rounded-full transition-all duration-100"
                  style={{
                    height: `${height}px`,
                    opacity: currentTime / totalDuration > i / 40 ? 1 : 0.3,
                  }}
                />
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <Slider
              value={[currentTime]}
              max={totalDuration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-16"
              />
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 mr-[-2px]" />
              )}
            </button>

            {/* Spacer */}
            <div className="w-[72px]" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
