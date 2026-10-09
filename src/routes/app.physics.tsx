import { createFileRoute } from "@tanstack/react-router";
import { Enter, PhysicsCheckRow, SeverityBadge } from "@/components/varun/ui";
import { anomalies } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/app/physics")({
  head: () =>
    seo(
      "Physics Reports — VARUN Dashboard",
      "Conservation-law validation results for every generated hazard field (sample data).",
    ),
  component: Physics,
});

function Physics() {
  return (
    <>
      <Enter className="mb-6">
        <h2 className="text-xl font-semibold">Physics Validation</h2>
        <p className="mt-1.5 text-sm text-muted">
          Every hazard field is checked against fluid-dynamics and thermodynamic conservation laws
          before being released.
        </p>
      </Enter>
      <div className="flex flex-col gap-5">
        {anomalies.map((a) => {
          const failed = a.checks.some((c) => !c.pass);
          return (
            <div key={a.id} className="rounded-lg bg-surface p-6">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="text-base font-semibold">{a.name}</span>
                <SeverityBadge level={a.severity} />
                <span
                  className={`ml-auto font-mono text-[15px] font-semibold ${a.physics >= 0.85 ? "text-green" : "text-amber"}`}
                >
                  {a.physics.toFixed(2)}
                </span>
              </div>
              {a.checks.map((c) => (
                <PhysicsCheckRow key={c.name} {...c} />
              ))}
              {failed && (
                <p className="mt-2 text-xs text-red">
                  Flagged for manual review — moisture convergence below threshold (0.70).
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
