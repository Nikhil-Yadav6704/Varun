import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/app/settings")({
  head: () =>
    seo("Settings — VARUN Dashboard", "Profile and alert preferences for the VARUN dashboard."),
  component: SettingsPage,
});

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full border border-line transition-colors duration-150 ${on ? "bg-cyan" : "bg-surface"}`}
    >
      <span
        className={`absolute top-0.5 size-[18px] rounded-full bg-fg transition-all duration-150 ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

function SettingsPage() {
  const [prefs, setPrefs] = useState([
    ["Email alerts for SEVERE events", true],
    ["Push notifications", true],
    ["Weekly summary digest", false],
  ] as [string, boolean][]);

  return (
    <div className="max-w-[640px]">
      <div className="mb-5 rounded-lg bg-surface p-7">
        <h2 className="mb-5 font-sans text-base font-semibold">Profile</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
            Name
            <input className="field" defaultValue="Aarav Sharma" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
            Team
            <input
              className="field !bg-bg !text-faint"
              value="Eklavyaaa · Team ID 186159"
              readOnly
            />
          </label>
        </div>
      </div>
      <div className="rounded-lg bg-surface p-7">
        <h2 className="mb-4 font-sans text-base font-semibold">Alert Preferences</h2>
        {prefs.map(([l, on], i) => (
          <div
            key={l}
            className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0"
          >
            <span className="text-sm">{l}</span>
            <Toggle
              on={on}
              onChange={() => setPrefs((p) => p.map((x, j) => (j === i ? [x[0], !x[1]] : x)))}
            />
          </div>
        ))}
      </div>
      <button className="btn-primary mt-6 rounded-sm px-6 py-3 text-sm">Save Changes</button>
    </div>
  );
}
