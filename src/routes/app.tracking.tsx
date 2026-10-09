import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { IndiaMap } from "@/components/varun/IndiaMap";
import { AnomalyCard } from "@/components/varun/ui";
import { anomalies } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/app/tracking")({
  head: () =>
    seo(
      "Live Tracking — VARUN Dashboard",
      "Map of tracked extreme-weather anomalies over India with a time-step scrubber (sample data).",
    ),
  component: Tracking,
});

const layers = ["Anomaly Tracks", "Hazard Overlay", "Uncertainty"];

function Tracking() {
  const [step, setStep] = useState(18);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<string[]>(["Anomaly Tracks"]);
  const toggle = (l: string) =>
    setActive((a) => (a.includes(l) ? a.filter((x) => x !== l) : [...a, l]));

  return (
    <div className="grid gap-5 lg:h-[calc(100vh-128px)] lg:grid-cols-[1fr_360px]">
      <div className="relative h-[520px] overflow-hidden rounded-lg border border-line bg-surface lg:h-auto">
        <div className="absolute inset-0 px-4 pt-14 pb-24">
          <IndiaMap />
        </div>
        <div className="absolute top-4 right-4 left-4 flex flex-wrap justify-end gap-2">
          {layers.map((l) => (
            <button
              key={l}
              onClick={() => toggle(l)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-150 ${active.includes(l) ? "border-cyan text-cyan" : "border-line text-muted"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-md bg-bg/90 px-4 py-3 backdrop-blur-md">
          <button
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause" : "Play"}
            className="text-fg"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <div className="flex-1">
            <div className="mb-1 text-xs text-muted">Time Step {step} / 24</div>
            <input
              type="range"
              min={1}
              max={24}
              value={step}
              onChange={(e) => setStep(+e.target.value)}
              className="w-full accent-cyan"
            />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto rounded-lg bg-surface p-5">
        <h2 className="mb-4 font-sans text-[15px] font-semibold">Tracked Anomalies (3)</h2>
        <div className="flex flex-col gap-3">
          {anomalies.map((a, i) => (
            <AnomalyCard key={a.id} a={a} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
