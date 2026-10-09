import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { anomalies, fmtCoords, sevColor } from "@/lib/data";

// Stylized projection: lon 68–97 → x 20–380, lat 37–7 → y 20–480
const px = (lon: number) => 20 + (lon - 68) * (360 / 29);
const py = (lat: number) => 20 + (37 - lat) * (460 / 30);

const OUTLINE =
  "M94 20 L132 43 L157 89 L181 127 L218 158 L268 166 L280 181 L330 166 L372 160 L367 173 L355 219 L330 250 L318 212 L287 250 L268 258 L256 265 L243 281 L218 311 L194 334 L169 357 L169 388 L166 434 L144 465 L132 462 L119 434 L107 396 L94 357 L82 319 L80 288 L77 265 L45 250 L26 235 L32 212 L57 204 L45 166 L70 143 L94 112 L101 81 L88 51 Z";

export function IndiaMap() {
  const navigate = useNavigate();
  const [hover, setHover] = useState<string | null>(null);
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <path
        d={OUTLINE}
        fill="var(--bg-raised)"
        stroke="var(--border-strong)"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      {anomalies.map((a) => {
        const x = px(a.lon),
          y = py(a.lat),
          c = sevColor[a.severity];
        return (
          <g
            key={a.id}
            className="cursor-pointer"
            onMouseEnter={() => setHover(a.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate({ to: "/app/anomaly/$id", params: { id: a.id } })}
          >
            <circle cx={x} cy={y} r={14} fill="transparent" />
            <circle
              cx={x}
              cy={y}
              r={5}
              fill="none"
              stroke={c}
              strokeWidth={2}
              className="pulse-ring"
            />
            <circle cx={x} cy={y} r={5} fill={c} />
          </g>
        );
      })}
      {anomalies
        .filter((a) => a.id === hover)
        .map((a) => {
          const x = px(a.lon),
            y = py(a.lat);
          const w = 190,
            left = Math.min(Math.max(x - w / 2, 4), 400 - w - 4);
          return (
            <foreignObject
              key="tip"
              x={left}
              y={y - 62}
              width={w}
              height={50}
              className="pointer-events-none"
            >
              <div className="rounded-sm border border-line bg-raised px-2.5 py-2 font-mono text-[11px] leading-tight">
                <div className="truncate text-fg">{a.short}</div>
                <div className="text-muted">{fmtCoords(a)}</div>
              </div>
            </foreignObject>
          );
        })}
    </svg>
  );
}
