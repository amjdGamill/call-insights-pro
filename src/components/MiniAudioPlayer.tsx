import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { Play, Pause, X } from "lucide-react";
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
        <div className="fixed bottom-20 left-0 right-0 z-50 px-3 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto bg-card border border-border rounded-2xl shadow-lg px-3 py-2 flex items-center gap-3">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
              aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground truncate">{current.callerName}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>
              <Slider
                value={[currentTime]}
                max={totalDuration || 100}
                step={1}
                onValueChange={(v) => setCurrentTime(v[0])}
                className="w-full mt-1"
              />
            </div>
            <button
              onClick={close}
              className="w-8 h-8 shrink-0 rounded-full bg-secondary flex items-center justify-center text-foreground"
              aria-label="إغلاق المشغل"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </AudioPlayerContext.Provider>
  );
}
