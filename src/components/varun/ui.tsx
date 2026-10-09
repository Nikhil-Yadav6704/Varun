import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowDown, ArrowUp, CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { fmtCoords, type Anomaly, type Severity } from "@/lib/data";
import { cn } from "@/lib/utils";

export function RadarMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" />
      <g className="sweep">
        <path d="M12 12 L12 1.5 A10.5 10.5 0 0 1 21.09 6.75 Z" fill="url(#sweepGrad)" />
      </g>
      <circle cx="12" cy="12" r="1.5" fill="var(--accent-cyan)" />
    </svg>
  );
}

export function Wordmark({ icon = 24, text = "text-xl" }: { icon?: number; text?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <RadarMark size={icon} />
      <span className={cn("font-display font-bold text-fg", text)}>VARUN</span>
    </Link>
  );
}

const sevClass: Record<Severity, string> = {
  SEVERE: "bg-red/15 text-red border-red/30",
  HIGH: "bg-amber/15 text-amber border-amber/30",
  MODERATE: "bg-cyan/12 text-cyan border-cyan/30",
};

export function SeverityBadge({ level, large }: { level: Severity; large?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border font-semibold uppercase tracking-[0.04em] whitespace-nowrap",
        large ? "px-3.5 py-1.5 text-sm" : "px-2.5 py-1 text-xs",
        sevClass[level],
      )}
    >
      {level}
    </span>
  );
}

export function StatCard({
  label,
  value,
  trend,
  trendDir = "up",
  trendClass = "text-green",
  valueClass = "text-fg text-[28px]",
  index = 0,
}: {
  label: string;
  value: ReactNode;
  trend?: string;
  trendDir?: "up" | "down";
  trendClass?: string;
  valueClass?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
      className="rounded-md border border-line bg-surface p-5"
    >
      <div className="text-xs font-medium uppercase text-muted">{label}</div>
      <div className={cn("mt-2 font-mono font-semibold", valueClass)}>{value}</div>
      {trend && (
        <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trendClass)}>
          {trendDir === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {trend}
        </div>
      )}
    </motion.div>
  );
}

export function AnomalyCard({ a, index = 0 }: { a: Anomaly; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
    >
      <Link
        to="/app/anomaly/$id"
        params={{ id: a.id }}
        className="block rounded-md border border-line bg-surface p-4 transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-[15px] font-semibold text-fg">{a.name}</span>
          <SeverityBadge level={a.severity} />
        </div>
        <div className="mt-2 font-mono text-xs text-muted">{fmtCoords(a)}</div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <span>
            Max EFI: <span className="text-fg">{a.efi.toFixed(2)}</span>
          </span>
          <span>
            Confidence: <span className="text-fg">{a.confidence.toFixed(2)}</span>
          </span>
          <span>
            Physics: <span className="text-fg">{a.physics.toFixed(2)}</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function PhysicsCheckRow({
  name,
  score,
  pass,
}: {
  name: string;
  score: number;
  pass: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3.5 last:border-b-0">
      <div className="flex items-center gap-2.5 text-sm font-medium">
        {pass ? (
          <CheckCircle2 size={18} className="text-green" />
        ) : (
          <XCircle size={18} className="text-red" />
        )}
        {name}
      </div>
      <span className={cn("font-mono text-sm font-medium", !pass && "text-red")}>
        {score.toFixed(2)}
      </span>
    </div>
  );
}

export function StageChip({
  children,
  tone = "violet",
}: {
  children: ReactNode;
  tone?: "violet" | "cyan" | "green";
}) {
  const t = {
    violet: "text-violet border-violet/60",
    cyan: "text-cyan border-line-strong",
    green: "text-green border-green/60",
  }[tone];
  return (
    <span className={cn("inline-flex rounded-full border px-3.5 py-1.5 text-xs font-semibold", t)}>
      {children}
    </span>
  );
}

export function Enter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({
  eyebrow,
  eyebrowClass,
  title,
  sub,
}: {
  eyebrow: string;
  eyebrowClass: string;
  title: string;
  sub?: string;
}) {
  return (
    <Enter className="mx-auto max-w-[1200px] px-6 pt-[140px]">
      <div className="max-w-[760px]">
        <div className={cn("text-xs font-semibold uppercase tracking-[0.08em]", eyebrowClass)}>
          {eyebrow}
        </div>
        <h1 className="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.1]">{title}</h1>
        {sub && <p className="mt-4 text-[17px] leading-relaxed text-muted">{sub}</p>}
      </div>
    </Enter>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-lg bg-surface p-6", className)}>{children}</div>;
}
