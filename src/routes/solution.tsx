import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Database,
  Dot,
  LayoutDashboard,
  Layers,
  Map,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Fragment } from "react";
import { PublicShell } from "@/components/varun/PublicShell";
import { PageHeader, StageChip } from "@/components/varun/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/solution")({
  head: () =>
    seo(
      "How VARUN Works — Two-stage AI pipeline",
      "GNN anomaly detection, diffusion downscaling to 5 km, and a physics validation gate.",
    ),
  component: Solution,
});

const nodes = [
  {
    icon: Database,
    label: "Data Layer — ERA5 / NWP (12km)",
    c: "text-muted",
    b: "border-line-strong",
  },
  {
    icon: Radar,
    label: "Stage 1 — Anomaly Detection & Tracking (GNN)",
    c: "text-violet",
    b: "border-violet",
  },
  {
    icon: Sparkles,
    label: "Stage 2 — Downscaling (Diffusion, 12km→5km)",
    c: "text-violet",
    b: "border-violet",
  },
  {
    icon: ShieldCheck,
    label: "Physics Validation Gate (MetPy)",
    c: "text-green",
    b: "border-line-strong",
  },
  {
    icon: LayoutDashboard,
    label: "Outputs — Dashboard / Alert API / 5km Hazard Maps",
    c: "text-cyan",
    b: "border-line-strong",
  },
];

const stages = [
  {
    chip: "STAGE 1",
    tone: "violet" as const,
    dot: "text-violet",
    title: "GNN Anomaly Tracker",
    items: [
      "Maps atmosphere onto an icosahedral (spherical) mesh to avoid flat-projection distortion",
      "Computes Extreme Forecast Index (EFI) against ERA5 30-year climatology",
      "Uses DBSCAN spatial clustering to group extreme cells into distinct anomaly blobs",
      "Tracks anomalies across time steps to produce 4D bounding boxes (lat, lon, level, time)",
    ],
  },
  {
    chip: "STAGE 2",
    tone: "violet" as const,
    dot: "text-violet",
    title: "Diffusion Downscaler",
    items: [
      "Takes the cropped bounding box and feeds it into a conditional denoising diffusion probabilistic model (DDPM)",
      "Preserves extreme amplitudes — unlike MSE-optimized models that blur peaks",
      "Generates a 5 km probabilistic hazard field",
    ],
  },
  {
    chip: "GATE",
    tone: "green" as const,
    dot: "text-green",
    title: "Physics Validation",
    items: [
      "Embeds fluid dynamics and thermodynamic conservation laws as validation checks",
      "MetPy-based validation rejects physically impossible outputs",
      "Produces a physics confidence score for every output",
    ],
  },
];

const outputs = [
  {
    icon: Map,
    t: "Interactive GIS Dashboard",
    d: "Animated map, anomaly tracks, and hazard overlays.",
  },
  {
    icon: Bell,
    t: "REST Alert API",
    d: "Coordinate-based alert queries returned with a confidence score.",
  },
  {
    icon: Layers,
    t: "Uncertainty Visualization",
    d: "Ensemble spread shown alongside every hazard field.",
  },
];

function Solution() {
  return (
    <PublicShell>
      <PageHeader
        eyebrow="The Solution"
        eyebrowClass="text-violet"
        title="A two-stage hybrid AI pipeline"
        sub="Detect the anomaly cheaply at coarse resolution. Only then spend expensive compute sharpening exactly that region to 5 km."
      />
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mt-16 overflow-x-auto rounded-lg bg-surface p-6 md:p-10">
          <div className="flex min-w-max items-center gap-3">
            {nodes.map((n, i) => (
              <Fragment key={n.label}>
                <div
                  className={`flex w-[180px] flex-col items-center gap-3 rounded-md border bg-raised p-[18px] text-center ${n.b}`}
                >
                  <n.icon size={22} className={n.c} />
                  <span className="text-[13px] font-medium leading-snug">{n.label}</span>
                </div>
                {i < nodes.length - 1 && <ArrowRight size={16} className="shrink-0 text-faint" />}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="mt-24">
          {stages.map((s) => (
            <div
              key={s.chip}
              className="grid gap-10 border-b border-line py-14 first:pt-0 last:border-b-0 md:grid-cols-2"
            >
              <div>
                <StageChip tone={s.tone}>{s.chip}</StageChip>
                <h3 className="mt-3 text-[22px] font-semibold">{s.title}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Dot size={20} className={`shrink-0 ${s.dot}`} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {outputs.map((o) => (
            <div key={o.t} className="rounded-md bg-surface p-6">
              <o.icon size={22} className="text-cyan" />
              <div className="mt-4 text-[15px] font-semibold">{o.t}</div>
              <p className="mt-2 text-[13px] text-muted">{o.d}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
