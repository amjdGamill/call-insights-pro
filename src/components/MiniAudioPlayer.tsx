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
        <div className="fixed bottom-24 left-0 right-0 z-50 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto bg-card/95 backdrop-blur-xl border-t border-b border-border shadow-2xl px-4 pt-3 pb-4">
            {/* Top row: avatar + title + close */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
                <span className="text-base font-bold text-primary">
                  {current.callerName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">
                  {current.callerName}
                </h4>
                <p className="text-xs text-muted-foreground">جاري التشغيل</p>
              </div>
              <button
                onClick={close}
                className="w-7 h-7 shrink-0 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors"
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
            <div className="flex justify-between text-[11px] text-muted-foreground tabular-nums mt-1.5">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(Math.max(0, totalDuration - currentTime))}</span>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-center gap-6 mt-3">
              <button
                onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center text-foreground transition-colors"
                aria-label="رجوع 10 ثوان"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
                aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 mr-[-2px]" />}
              </button>
              <button
                onClick={() => setCurrentTime((t) => Math.min(totalDuration, t + 10))}
                className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center text-foreground transition-colors"
                aria-label="تقديم 10 ثوان"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </AudioPlayerContext.Provider>
  );
}
