import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Truck, Wheat } from "lucide-react";
import { PublicShell } from "@/components/varun/PublicShell";
import { PageHeader } from "@/components/varun/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/problem")({
  head: () =>
    seo(
      "The Problem — VARUN",
      "India's 12 km forecasts are accurate but too blurry to act on for hyper-local extreme weather.",
    ),
  component: Problem,
});

const rows = [
  ["Domain", "Medium-range (3–10 day) extreme weather forecasting over India"],
  [
    "Current Gap",
    "IMD's operational NWP models (NCUM/NEPS-G) produce 12 km resolution grids — too coarse to resolve hyper-local events like cloudbursts, flash floods, or localized cyclonic bands (1–5 km phenomena)",
  ],
  [
    "Technical Root Cause",
    "Standard deep learning models (CNN/U-Net) suffer from spectral smoothing — they average out the extreme peaks that forecasters actually need",
  ],
  [
    "Operational Root Cause",
    "Warnings are issued at district/state level, but actual damage zones are often just a few km wide — leading to alert fatigue and public complacency",
  ],
  [
    "Consequence",
    "Lives lost, crops destroyed, emergency resources mis-deployed because alerts are too broad and forecasts too blurry",
  ],
];

const cards = [
  {
    icon: AlertTriangle,
    t: "Lives at risk",
    d: "Hyper-local events like cloudbursts strike narrower areas than district warnings can cover.",
  },
  {
    icon: Wheat,
    t: "Crop & property loss",
    d: "Flash floods and localized wind events damage specific zones that broad alerts don't pinpoint.",
  },
  {
    icon: Truck,
    t: "Resource misallocation",
    d: "Emergency teams deploy to entire districts instead of the actual few-kilometer impact zone.",
  },
];

function Problem() {
  return (
    <PublicShell>
      <PageHeader
        eyebrow="The Gap"
        eyebrowClass="text-red"
        title="Forecasts are accurate. They're just too blurry to act on."
        sub="India's operational models already see extreme weather coming. The problem is resolution, warning geography, and the gap between the two."
      />
      <div className="mx-auto max-w-[1200px] px-6">
        <dl className="mt-16 overflow-hidden rounded-lg border border-line bg-surface">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col gap-2 border-b border-line px-7 py-5 last:border-b-0 md:flex-row md:gap-6"
            >
              <dt className="shrink-0 text-[13px] font-semibold uppercase text-cyan md:w-[220px]">
                {k}
              </dt>
              <dd className="text-[15px] leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.t} className="rounded-md bg-surface p-6">
              <c.icon size={24} className="text-amber" />
              <div className="mt-4 text-[15px] font-semibold">{c.t}</div>
              <p className="mt-2 text-[13px] text-muted">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-[72px] text-center">
          <Link to="/solution" className="text-[15px] font-medium text-cyan">
            See how VARUN closes this gap →
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
