import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, LayoutDashboard, LogOut, Menu, Radar, Settings, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { RadarMark } from "@/components/varun/ui";
import { getAnomaly } from "@/lib/data";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/tracking", label: "Live Tracking", icon: Radar },
  { to: "/app/alerts", label: "Alerts", icon: Bell },
  { to: "/app/physics", label: "Physics Reports", icon: ShieldCheck },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

function titleFor(path: string) {
  if (path.startsWith("/app/anomaly/"))
    return getAnomaly(path.split("/")[3] ?? "")?.name ?? "Anomaly";
  if (path.startsWith("/app/tracking")) return "Live Tracking";
  if (path.startsWith("/app/alerts")) return "Alerts";
  if (path.startsWith("/app/physics")) return "Physics Reports";
  if (path.startsWith("/app/settings")) return "Settings";
  return "Overview";
}

function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-10 min-h-screen">
      {open && (
        <div className="fixed inset-0 z-40 bg-bg/70 sm:hidden" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-raised px-4 py-6 transition-transform duration-150 sm:w-[72px] sm:translate-x-0 lg:w-[268px] ${open ? "w-[268px] translate-x-0" : "w-[268px] -translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between px-1">
          <Link to="/" className="flex items-center gap-2">
            <RadarMark size={22} />
            <span
              className={`font-display text-[17px] font-bold ${open ? "" : "sm:hidden lg:inline"}`}
            >
              VARUN
            </span>
          </Link>
          <button
            className="text-muted sm:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: "exact" in n }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-sm border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-muted transition-colors duration-150 hover:bg-surface-hover"
              activeProps={{ className: "!border-cyan bg-surface !text-fg hover:bg-surface" }}
              title={n.label}
            >
              <n.icon size={18} className="shrink-0" />
              <span className={open ? "" : "sm:hidden lg:inline"}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2.5 border-t border-line pt-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan text-xs font-semibold text-bg">
            AA
          </span>
          <div className={open ? "" : "sm:hidden lg:block"}>
            <div className="text-[13px] font-medium">Anjali Arya</div>
            <div className="text-[11px] text-faint">Frontend Developer / Team Leader</div>
          </div>
        </div>
      </aside>

      <div className="sm:ml-[72px] lg:ml-[268px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-bg/90 px-4 backdrop-blur-md sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="text-muted sm:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="truncate font-display text-lg font-semibold">{titleFor(path)}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-medium text-faint">
              DEMO MODE — sample data
            </span>
            <Link
              to="/"
              aria-label="Log out"
              className="text-muted transition-colors duration-150 hover:text-fg"
            >
              <LogOut size={18} />
            </Link>
          </div>
        </header>
        <main className="max-w-[1320px] px-4 py-8 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
