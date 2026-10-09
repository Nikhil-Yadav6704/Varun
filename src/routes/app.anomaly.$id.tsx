import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Panel, PhysicsCheckRow, SeverityBadge, StatCard } from "@/components/varun/ui";
import { fmtCoords, getAnomaly, sevColor } from "@/lib/data";

export const Route = createFileRoute("/app/anomaly/$id")({
  loader: ({ params }) => {
    const a = getAnomaly(params.id);
    if (!a) throw notFound();
    return { a };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.a.name} — VARUN` : "Anomaly not found — VARUN";
    const d = loaderData
      ? `Trajectory, 5 km hazard field and physics checks for ${loaderData.a.name} (sample data).`
      : "This anomaly does not exist.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="text-muted">
      Anomaly not found.{" "}
      <Link to="/app/tracking" className="text-cyan">
        Back to tracking
      </Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { a } = Route.useLoaderData();
  const color = sevColor[a.severity];
  return (
    <>
      <Link
        to="/app/tracking"
        className="text-[13px] text-muted transition-colors duration-150 hover:text-cyan"
      >
        ← All anomalies
      </Link>
      <div className="mt-4 mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{a.name}</h2>
          <div className="mt-1 font-mono text-[13px] text-muted">{fmtCoords(a)}</div>
        </div>
        <SeverityBadge level={a.severity} large />
      </div>
      <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard index={0} label="Max EFI" value={a.efi.toFixed(2)} />
        <StatCard index={1} label="Confidence" value={a.confidence.toFixed(2)} />
        <StatCard index={2} label="Physics Score" value={a.physics.toFixed(2)} />
        <StatCard index={3} label="Area (cells)" value={a.area} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="font-sans text-base font-semibold">Trajectory</h3>
          <div className="relative mt-10 flex justify-between px-2">
            <div className="absolute top-2 right-4 left-4 h-px bg-line-strong" />
            {["T-5", "T-4", "T-3", "T-2", "T-1", "T-0"].map((t, i) => {
              const last = i === 5;
              return (
                <div key={t} className="relative flex flex-col items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" className="overflow-visible">
                    {last && (
                      <circle
                        cx="9"
                        cy="9"
                        r="7"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        className="pulse-ring"
                      />
                    )}
                    <circle
                      cx="9"
                      cy="9"
                      r={last ? 7 : 4}
                      fill={last ? color : "var(--text-faint)"}
                    />
                  </svg>
                  <span className="font-mono text-xs text-muted">{t}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-[13px] text-muted">
            Centroid-matched across 24 time steps — 4D bounding box (lat, lon, level, time).
          </p>
        </Panel>
        <Panel>
          <h3 className="font-sans text-base font-semibold">5km Hazard Field</h3>
          <div
            className="mt-4 h-[220px] rounded-md bg-raised"
            style={{
              backgroundImage: `radial-gradient(ellipse at 55% 50%, color-mix(in oklab, ${color} 85%, transparent), color-mix(in oklab, ${color} 30%, transparent) 35%, transparent 70%)`,
            }}
          />
          <div className="mt-3 flex items-center gap-2 text-[11px] text-faint">
            <span>Low</span>
            <span className="hazard-legend h-1.5 flex-1 rounded-full" />
            <span>Extreme</span>
          </div>
        </Panel>
      </div>
      <Panel className="mt-6">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-sans text-base font-semibold">Physics Validation</h3>
          <Link to="/app/physics" className="text-[13px] text-cyan">
            Full report →
          </Link>
        </div>
        {a.checks.map((c) => (
          <PhysicsCheckRow key={c.name} {...c} />
        ))}
      </Panel>
    </>
  );
}
