import Link from "next/link";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   Small presentational building blocks shared across the admin surface.
   Pure server components (no client JS) unless noted.
   ────────────────────────────────────────────────────────────────────────── */

/** Page title + optional description and right-aligned actions. */
export function PageHead({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-onyx-500">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex flex-shrink-0 items-center gap-2">{children}</div>}
    </div>
  );
}

/** A white, hairline-bordered surface — the base panel for the admin. */
export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-onyx-100 bg-white shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Connection status pill driven by a boolean. */
export function StatusPill({ connected }: { connected: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest",
        connected
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
          : "bg-onyx-50 text-onyx-500 ring-1 ring-inset ring-onyx-200"
      )}
    >
      {connected ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      Supabase {connected ? "connected" : "not connected"}
    </span>
  );
}

/**
 * The standard "Connect Supabase to enable saving" notice. Rendered inline so
 * the surrounding UI stays fully visible and usable.
 */
export function NotConfiguredNotice({
  className,
  title = "Connect Supabase to enable saving",
  detail = "The dashboard is fully browsable using the bundled catalogue, but writing changes and uploading media needs a live Supabase project.",
}: {
  className?: string;
  title?: string;
  detail?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-200 bg-amber-50/70 p-5",
        className
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-amber-900">
            {title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800/90">{detail}</p>
          <ul className="mt-3 space-y-1.5">
            {[
              "NEXT_PUBLIC_SUPABASE_URL",
              "NEXT_PUBLIC_SUPABASE_ANON_KEY",
              "SUPABASE_SERVICE_ROLE_KEY",
            ].map((envVar) => (
              <li key={envVar} className="flex items-center gap-2">
                <code className="rounded-md bg-white px-2 py-0.5 font-mono text-[12px] font-semibold text-amber-900 ring-1 ring-inset ring-amber-200">
                  {envVar}
                </code>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-amber-800/80">
            See{" "}
            <span className="font-semibold text-amber-900">SETUP-GUIDE.md</span> for
            step-by-step instructions, then add the keys to{" "}
            <code className="font-mono text-[11px]">.env.local</code> and restart.
          </p>
        </div>
      </div>
    </div>
  );
}

/** A subtle empty-state used inside tables/lists. */
export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p className="font-display text-base font-bold uppercase tracking-wide text-onyx-700">
        {title}
      </p>
      {hint && <p className="max-w-sm text-sm text-onyx-400">{hint}</p>}
      {action}
    </div>
  );
}

/** Small flag pill for product table (Featured / New / Bestseller). */
export function FlagPill({
  label,
  tone,
}: {
  label: string;
  tone: "ember" | "onyx" | "muted";
}) {
  const tones: Record<typeof tone, string> = {
    ember: "bg-ember-50 text-ember-700 ring-ember-200",
    onyx: "bg-onyx-900 text-white ring-onyx-900",
    muted: "bg-onyx-50 text-onyx-600 ring-onyx-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset",
        tones[tone]
      )}
    >
      {label}
    </span>
  );
}

/** Inline link styled as a quiet action. */
export function QuietLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-ember-600 transition-colors hover:text-ember-700"
    >
      {children}
    </Link>
  );
}
