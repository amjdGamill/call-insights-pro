import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface PlayerState {
  callerName: string;
  duration: string;
}

interface AudioPlayerContextValue {
  play: (state: PlayerState) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
}

function parseDuration(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PlayerState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = (state: PlayerState) => {
    setCurrent(state);
    setTotalDuration(parseDuration(state.duration));
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const close = () => {
    setCurrent(null);
    setIsPlaying(false);
    setCurrentTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying && current) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, current, totalDuration]);

  return (
    <AudioPlayerContext.Provider value={{ play }}>
      {children}
      {current && (
        <div className="fixed bottom-20 left-0 right-0 z-50 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto bg-card border-t border-border shadow-lg px-4 pt-2 pb-3">
            {/* Top row: title + close */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm font-semibold text-foreground truncate flex-1">
                {current.callerName}
              </span>
              <button
                onClick={close}
                className="w-7 h-7 shrink-0 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground"
                aria-label="إغلاق المشغل"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress slider */}
            <Slider
              value={[currentTime]}
              max={totalDuration || 100}
              step={1}
              onValueChange={(v) => setCurrentTime(v[0])}
              className="w-full"
            />

            {/* Time stamps */}
            <div className="flex justify-between text-xs text-muted-foreground tabular-nums mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>

            {/* Play/Pause centered below */}
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 mr-[-2px]" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </AudioPlayerContext.Provider>
  );
}
