import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/varun/PublicShell";
import { PageHeader } from "@/components/varun/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research")({
  head: () =>
    seo(
      "Research & Methodology — VARUN",
      "The published forecasting research behind VARUN: GraphCast, GenCast, spateGAN, EFI, ERA5 and IMD NWP.",
    ),
  component: Research,
});

const refs = [
  ["GraphCast", "DeepMind, 2023", "GNN for global weather forecasting"],
  ["GenCast", "DeepMind, 2024", "Diffusion model for ensemble forecasting"],
  ["spateGAN-ERA5", "Nature, 2022", "GAN-based downscaling preserving extremes"],
  ["Extreme Forecast Index (EFI)", "ECMWF", "Standard index for anomalous weather detection"],
  ["ERA5 Reanalysis", "Copernicus CDS", "30+ years of global reanalysis data"],
  ["NEPS-G / NCUM", "IMD", "India's operational 12km NWP forecasts"],
];

function Research() {
  return (
    <PublicShell>
      <PageHeader
        eyebrow="References"
        eyebrowClass="text-cyan"
        title="Built on published research, not guesswork"
      />
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mt-14 overflow-hidden rounded-lg border border-line bg-surface">
          <div className="grid grid-cols-2 bg-raised px-6 py-4 text-xs font-semibold uppercase text-muted">
            <span>Source</span>
            <span>Key Takeaway</span>
          </div>
          {refs.map(([t, v, k]) => (
            <div
              key={t}
              className="grid grid-cols-2 gap-4 border-t border-line px-6 py-[18px] transition-colors duration-150 hover:bg-surface-hover"
            >
              <div>
                <div className="text-sm font-semibold">{t}</div>
                <div className="mt-0.5 font-mono text-xs text-faint">{v}</div>
              </div>
              <div className="text-sm text-muted">{k}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-[760px] rounded-lg border-l-[3px] border-cyan bg-surface p-8">
          <div className="text-xs font-semibold uppercase text-cyan">Methodology</div>
          <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
            Every component in this prototype — the spherical-mesh anomaly graph, the
            amplitude-preserving diffusion downscaler, and the MetPy physics gate — follows a
            pattern established in peer-reviewed forecasting research, adapted here for
            India-specific, medium-range, hyper-local alerting.
          </p>
        </div>
      </div>
    </PublicShell>
  );
}
