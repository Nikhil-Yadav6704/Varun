import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/varun/PublicShell";
import { Enter } from "@/components/varun/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/team")({
  head: () =>
    seo(
      "Team Eklavyaaa — VARUN",
      "Meet Team Eklavyaaa (Team ID 186159), building VARUN for Smart India Hackathon 2026.",
    ),
  component: Team,
});

const members = [
  ["Anjali Arya", "Frontend Developer / Team Leader"],
  ["Sonu Saini", "Full Stack / ML Developer"],
  ["Harsh Jangir", "AI/ML Designer"],
  ["Nikhil Yadav", "API Integration / Backend developer"],
];

function Team() {
  return (
    <PublicShell>
      <Enter className="mx-auto max-w-[700px] px-6 pt-[140px] text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan">
          Team ID 186159
        </div>
        <h1 className="mt-4 text-[clamp(32px,4vw,46px)] font-bold">Team Eklavyaaa</h1>
        <p className="mt-3.5 font-mono text-[13px] text-muted">
          Smart India Hackathon 2026 · PS 26078 · Theme: Smart Automation · Category: Software
        </p>
      </Enter>
      <div className="mx-auto mt-[72px] grid max-w-[1200px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map(([n, r]) => (
          <div key={n} className="rounded-md bg-surface p-6 text-center">
            <div className="mx-auto flex size-[72px] items-center justify-center rounded-full border border-line-strong bg-raised font-display text-[22px] font-semibold text-cyan">
              {n!
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </div>
            <div className="mt-3.5 text-[15px] font-semibold">{n}</div>
            <div className="mt-1 text-[13px] text-muted">{r}</div>
          </div>
        ))}
      </div>
    </PublicShell>
  );
}
