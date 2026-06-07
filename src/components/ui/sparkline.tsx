import { cn } from "@/lib/utils";

export function Sparkline({
  data,
  className,
  width = 104,
  height = 30,
  strokeWidth = 1.5
}: {
  data: number[];
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  if (data.length < 2) {
    return (
      <div aria-hidden className={cn(className)} style={{ width, height }} />
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pad = strokeWidth;
  const usableH = height - pad * 2;
  const points = data.map((value, index) => {
    const x = index * stepX;
    const y = pad + (1 - (value - min) / range) * usableH;
    return [x, y] as const;
  });
  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} ${width},${height} 0,${height}`;

  return (
    <svg
      aria-hidden
      className={cn("text-primary", className)}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <polygon points={area} fill="currentColor" fillOpacity={0.12} />
      <polyline
        fill="none"
        points={line}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
