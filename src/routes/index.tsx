import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, ShieldCheck, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/varun/PublicShell";
import { Enter } from "@/components/varun/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "VARUN — Street-level extreme weather alerts for India",
      "VARUN turns India's 12 km forecasts into 5 km AI-generated, physics-validated hazard alerts.",
    ),
  component: Home,
});

const stats = [
  ["12km → 5km", "resolution uplift"],
  ["24", "time-steps tracked per run"],
  ["3", "physics laws validated"],
  ["0.87", "sample alert confidence score"],
];

const steps = [
  {
    icon: Radar,
    title: "① Anomaly Detection (GNN)",
    desc: "Spot extreme cells on a spherical mesh.",
  },
  { icon: Sparkles, title: "② Downscaling (Diffusion)", desc: "Sharpen only that region to 5 km." },
  {
    icon: ShieldCheck,
    title: "③ Physics Validation Gate",
    desc: "Reject physically impossible outputs.",
  },
];

function Home() {
  return (
    <PublicShell>
      <section className="mx-auto flex min-h-[92vh] max-w-[840px] flex-col justify-center px-6 pt-24 text-center">
        <Enter>
          <span className="inline-flex rounded-full border border-line-strong px-4 py-1.5 text-[13px] font-medium text-cyan">
            Smart India Hackathon 2026 · PS 26078
          </span>
          <h1 className="mt-6 text-[clamp(40px,6vw,64px)] font-bold leading-[1.08]">
            Weather warnings precise enough to save one street, not just one state.
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-lg leading-normal text-muted">
            VARUN turns India's 12 km forecasts into 5 km AI-generated hazard alerts — detecting,
            tracking, and physics-validating extreme weather anomalies before they become disasters.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to="/app" className="btn-primary rounded-md px-7 py-3.5 text-[15px]">
              View Live Dashboard
            </Link>
            <Link
              to="/solution"
              className="btn-ghost rounded-md px-7 py-3.5 text-[15px] font-semibold"
            >
              How It Works
            </Link>
          </div>
        </Enter>
      </section>

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-line lg:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-bg p-7">
              <div className="font-mono text-[26px] font-semibold">{v}</div>
              <div className="mt-2 text-xs font-medium uppercase text-muted">{l}</div>
            </div>
          ))}
        </div>

        <section className="mt-[120px] text-center">
          <h2 className="text-[32px] font-semibold">A two-stage pipeline, not a bigger model</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-muted">
            Detect the anomaly first. Only then spend compute sharpening it.
          </p>
          <div className="relative mt-12 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <div className="absolute top-1/2 hidden h-px w-2/3 border-t border-dashed border-line-strong md:block" />
            <div className="absolute left-1/2 h-full w-px border-l border-dashed border-line-strong md:hidden" />
            {steps.map((s) => (
              <div
                key={s.title}
                className="relative w-[220px] rounded-lg border border-line bg-raised p-6 text-left"
              >
                <s.icon size={28} className="text-violet" />
                <div className="mt-4 text-[15px] font-semibold">{s.title}</div>
                <div className="mt-1 text-[13px] text-muted">{s.desc}</div>
              </div>
            ))}
          </div>
          <Link to="/solution" className="mt-8 inline-block text-sm font-medium text-cyan">
            See the full architecture →
          </Link>
        </section>

        <section className="mt-[120px] grid gap-10 rounded-lg bg-surface p-8 md:grid-cols-2 md:p-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-red">
              Why this matters
            </div>
            <h3 className="mt-2.5 text-2xl font-semibold">2023 Himachal Pradesh flash floods</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              The district-level warning covered a huge area, but the real damage sat inside a strip
              only a few kilometers wide. A hyper-local 5 km alert, issued early, could have changed
              the outcome.
            </p>
          </div>
          <div className="self-center rounded-md border border-line-strong bg-raised p-6">
            <div className="font-mono text-5xl font-bold text-cyan">5km</div>
            <p className="mt-2 text-sm text-muted">
              the resolution VARUN targets for hazard fields, versus the 12 km districts IMD
              currently warns at.
            </p>
          </div>
        </section>

        <section className="mt-[120px] mb-20 text-center">
          <h2 className="text-[30px] font-semibold">Explore the operations dashboard</h2>
          <p className="mt-2.5 text-[15px] text-muted">
            Sample tracking data, live-feeling alerts, and full physics reports — no login required
            to look.
          </p>
          <Link
            to="/app"
            className="btn-primary mt-6 inline-block rounded-md px-7 py-3.5 text-[15px]"
          >
            Enter Dashboard
          </Link>
        </section>
      </div>
    </PublicShell>
  );
}
