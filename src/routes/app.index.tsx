import { createFileRoute, Link } from "@tanstack/react-router";
import { AnomalyCard, Panel, StatCard } from "@/components/varun/ui";
import { anomalies } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/app/")({
  head: () =>
    seo(
      "Overview — VARUN Dashboard",
      "Active extreme-weather anomalies, severity and pipeline health (sample data).",
    ),
  component: Overview,
});

const health = [
  ["Stage 1 — GNN Detector", "Operational", "bg-green"],
  ["Stage 2 — Diffusion Model", "Operational", "bg-green"],
  ["Physics Gate", "Operational", "bg-green"],
  ["Data Ingestion (ERA5)", "Synthetic fallback active", "bg-amber"],
];

function Overview() {
  return (
    <>
      <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Active Anomalies"
          value="3"
          trend="+1 vs last run"
          trendClass="text-amber"
        />
        <StatCard
          index={1}
          label="Highest Severity"
          value="SEVERE"
          valueClass="text-red text-[28px]"
        />
        <StatCard index={2} label="Avg. Physics Score" value="0.89" />
        <StatCard
          index={3}
          label="Last Pipeline Run"
          value="6 days · 24 steps"
          valueClass="text-fg text-xl"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-sans text-base font-semibold">Tracked Anomalies</h2>
            <Link to="/app/tracking" className="text-[13px] text-cyan">
              View map →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {anomalies.map((a, i) => (
              <AnomalyCard key={a.id} a={a} index={i} />
            ))}
          </div>
        </Panel>
        <Panel className="self-start">
          <h2 className="mb-2 font-sans text-base font-semibold">Pipeline Health</h2>
          {health.map(([n, s, dot]) => (
            <div
              key={n}
              className="flex items-center justify-between gap-3 border-b border-line py-2.5 text-sm last:border-b-0"
            >
              <span>{n}</span>
              <span className="flex items-center gap-2 text-right text-muted">
                <span className={`size-2 shrink-0 rounded-full ${dot}`} />
                {s}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </>
  );
}
