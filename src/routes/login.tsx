import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Enter, Wordmark } from "@/components/varun/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    seo(
      "Sign in — VARUN Dashboard",
      "Sign in to the VARUN extreme-weather operations dashboard prototype.",
    ),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <Enter className="w-full max-w-[400px]">
        <div className="rounded-lg border border-line bg-surface p-10">
          <div className="mb-7 flex justify-center">
            <Wordmark icon={24} text="text-lg" />
          </div>
          <h2 className="text-center text-[22px] font-semibold">Sign in to the dashboard</h2>
          <p className="mt-2 mb-7 text-center text-[13px] text-muted">
            Sample credentials work — this is a prototype.
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/app" });
            }}
          >
            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
              Email
              <input type="email" className="field" placeholder="you@team.in" />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-muted">
              Password
              <input type="password" className="field" placeholder="••••••••" />
            </label>
            <button
              type="submit"
              className="btn-primary mt-2 w-full rounded-sm py-[13px] text-[15px]"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="mt-5 text-center">
          <Link
            to="/"
            className="text-[13px] text-muted transition-colors duration-150 hover:text-cyan"
          >
            ← Back to home
          </Link>
        </div>
      </Enter>
    </div>
  );
}
