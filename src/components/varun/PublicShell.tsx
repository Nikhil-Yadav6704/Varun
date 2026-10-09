import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Wordmark } from "./ui";

const links = [
  { to: "/problem", label: "The Problem" },
  { to: "/solution", label: "How It Works" },
  { to: "/research", label: "Research" },
  { to: "/team", label: "Team" },
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
              activeProps={{ className: "text-fg" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost rounded-md px-4 py-2 text-sm font-medium">
            Sign In
          </Link>
          <button className="text-muted lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-bg px-6 py-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-muted hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const col = "flex flex-col gap-3 text-sm text-muted";
  const a = "transition-colors duration-150 hover:text-fg";
  return (
    <footer className="mt-24 border-t border-line px-6 pt-16 pb-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Wordmark />
            <p className="mt-4 text-sm text-muted">
              Hyper-local extreme-weather alerts for India, built on a two-stage AI pipeline.
            </p>
          </div>
          <div className={col}>
            <span className="font-semibold text-fg">Product</span>
            <Link to="/app" className={a}>
              Dashboard
            </Link>
            <Link to="/solution" className={a}>
              How It Works
            </Link>
            <Link to="/research" className={a}>
              Research
            </Link>
          </div>
          <div className={col}>
            <span className="font-semibold text-fg">Project</span>
            <Link to="/problem" className={a}>
              The Problem
            </Link>
            <Link to="/team" className={a}>
              Team
            </Link>
            <Link to="/login" className={a}>
              Login
            </Link>
          </div>
          <div className={col}>
            <span className="font-semibold text-fg">Problem Statement</span>
            <p className="font-mono text-xs leading-relaxed">
              PS ID 26078 · SIH 2026 · Theme: Smart Automation · Team Eklavyaaa
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-5 text-[13px] text-faint sm:flex-row">
          <span>© 2026 Team Eklavyaaa — Smart India Hackathon prototype.</span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan" />
            Built for SIH 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
