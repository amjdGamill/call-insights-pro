import { useMemo } from "react";

interface WaveformProps {
  bars?: number;
  animated?: boolean;
  color?: string;
}

export function Waveform({ bars = 20, animated = false, color }: WaveformProps) {
  const heights = useMemo(() => {
    return Array.from({ length: bars }, () => Math.random() * 100);
  }, [bars]);

  return (
    <div className="flex items-center gap-[2px] h-8">
      {heights.map((height, index) => (
        <div
          key={index}
          className={`waveform-bar w-[3px] ${animated ? "animate-wave" : ""}`}
          style={{
            height: `${Math.max(20, height)}%`,
            animationDelay: animated ? `${index * 0.05}s` : undefined,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}
