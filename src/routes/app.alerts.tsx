import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SeverityBadge } from "@/components/varun/ui";
import type { Severity } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/app/alerts")({
  head: () =>
    seo(
      "Alerts — VARUN Dashboard",
      "Check hyper-local alerts for a city and review the recent alert log (sample data).",
    ),
  component: Alerts,
});

type Result = { level: Severity | "CLEAR"; msg: string };
const results: Record<string, Result> = {
  Kolkata: { level: "SEVERE", msg: "Cyclone Amphan Core is 23 km from Kolkata. Confidence: 0.87." },
  Shimla: { level: "HIGH", msg: "Cloudburst Cluster is 41 km from Shimla. Confidence: 0.78." },
  Bhubaneswar: {
    level: "MODERATE",
    msg: "Coastal Wind Anomaly is 68 km from Bhubaneswar. Confidence: 0.63.",
  },
  Mumbai: { level: "CLEAR", msg: "No active anomalies within 150 km of Mumbai." },
};
const tone = {
  SEVERE: ["bg-red", "text-red", "border-red"],
  HIGH: ["bg-amber", "text-amber", "border-amber"],
  MODERATE: ["bg-cyan", "text-cyan", "border-cyan"],
  CLEAR: ["bg-green", "text-green", "border-green"],
};

const log: [Severity, string, string][] = [
  ["SEVERE", "Cyclone Amphan Core confirmed — physics gate passed (0.92)", "T–2h"],
  ["HIGH", "Cloudburst Cluster detected over Himachal Pradesh", "T–5h"],
  ["MODERATE", "Coastal Wind Anomaly upgraded from LOW", "T–9h"],
  ["SEVERE", "Amphan Core 5km hazard field generated", "T–11h"],
  ["MODERATE", "New anomaly candidate flagged for review", "T–14h"],
];

function Alerts() {
  const [city, setCity] = useState("Kolkata");
  const [shown, setShown] = useState("Kolkata");
  const r = results[shown] ?? results["Kolkata"]!;
  const [dot, text, border] = tone[r.level];

  return (
    <>
      <div className="mb-7 rounded-lg bg-surface p-7">
        <h2 className="text-lg font-semibold">Check Alert for a Location</h2>
        <p className="mt-1.5 text-[13px] text-muted">
          Enter coordinates or pick a city to query the Alert API.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {Object.keys(results).map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${city === c ? "border-cyan text-cyan" : "border-line text-muted"}`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={() => setShown(city)}
            className="btn-primary rounded-sm px-[22px] py-[11px] text-sm"
          >
            Check Alert
          </button>
        </div>
        <div className={`mt-5 rounded-md border-l-[3px] bg-raised p-5 ${border}`}>
          <div className={`flex items-center gap-2 text-xs font-semibold uppercase ${text}`}>
            <span className={`size-2 rounded-full ${dot}`} />
            {r.level}
          </div>
          <p className="mt-2 text-[15px] leading-normal">{r.msg}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="border-b border-line px-6 py-5 text-[15px] font-semibold">
          Recent Alert Log
        </div>
        {log.map(([s, e, t], i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line px-6 py-4 last:border-b-0"
          >
            <SeverityBadge level={s} />
            <span className="text-sm">{e}</span>
            <span className="text-right font-mono text-xs text-faint">{t}</span>
          </div>
        ))}
      </div>
    </>
  );
}
