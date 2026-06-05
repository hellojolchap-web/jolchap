"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

/**
 * Branded split-screen admin sign-in. The anon URL/key are public, so we can
 * read `NEXT_PUBLIC_SUPABASE_URL` directly on the client to decide whether to
 * show the login form or a "connect Supabase" card.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;

    if (!email || !password) {
      toast.error("Enter your email and password.");
      return;
    }

    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message || "Sign in failed.");
        return;
      }
      toast.success("Welcome back.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[120] grid bg-bone lg:grid-cols-2">
      {/* ── Brand panel ─────────────────────────────────────────────────── */}
      <div className="relative hidden overflow-hidden bg-onyx-grad lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* ember glow */}
        <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-ember-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />

        <div className="relative">
          <Logo tone="light" withTagline />
        </div>

        <div className="relative max-w-md">
          <p className="kicker !text-ember-400">
            <span className="h-px w-7 bg-ember-500" />
            Command Centre
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tightest text-white">
            Run <span className="text-ember-500">Jolchap</span>.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Manage your catalogue, publish to the journal and ship optimised
            imagery — every product photo auto-converted to WebP on upload.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Catalogue & inventory control",
              "Editorial journal publishing",
              "Automatic WebP image pipeline",
            ].map((line) => (
              <li key={line} className="flex items-center gap-3 text-sm text-white/70">
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-ember-500/15 text-ember-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/35">
          © {new Date().getFullYear()} Jolchap Print &amp; Personalisation Studio — Authorised
          access only.
        </p>
      </div>

      {/* ── Form panel ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center overflow-y-auto p-6 sm:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          {configured ? (
            <>
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950">
                Sign in
              </h2>
              <p className="mt-1.5 text-sm text-onyx-500">
                Enter your administrator credentials to continue.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <Field
                  id="email"
                  label="Email"
                  icon={<Mail className="h-4 w-4" />}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@jolchap.com"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field
                  id="password"
                  label="Password"
                  icon={<Lock className="h-4 w-4" />}
                >
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputClass}
                    required
                  />
                </Field>

                <button
                  type="submit"
                  disabled={pending}
                  className="group/btn relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ember-500 font-semibold text-white shadow-glow-sm transition-all duration-300 hover:bg-ember-600 hover:shadow-glow active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-onyx-400">
                Protected area.{" "}
                <Link href="/" className="font-semibold text-onyx-600 hover:text-ember-600">
                  Return to store
                </Link>
              </p>
            </>
          ) : (
            <ConnectSupabaseCard />
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-onyx-200 bg-white pl-11 pr-4 text-[15px] text-onyx-900 outline-none transition-colors placeholder:text-onyx-300 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/30";

function Field({
  id,
  label,
  icon,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-onyx-500"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-onyx-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

/** Shown when Supabase env vars are absent — no form, clear setup guidance. */
function ConnectSupabaseCard() {
  return (
    <div className={cn("rounded-2xl border border-amber-200 bg-amber-50/70 p-6")}>
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-700">
        <Lock className="h-5 w-5" />
      </div>
      <h2 className="font-display text-xl font-extrabold uppercase tracking-tightest text-amber-900">
        Connect Supabase first
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-amber-800/90">
        Admin sign-in needs a live Supabase project. Add the following keys to
        your <code className="font-mono text-[12px]">.env.local</code>, then
        restart the dev server.
      </p>
      <ul className="mt-4 space-y-2">
        {[
          "NEXT_PUBLIC_SUPABASE_URL",
          "NEXT_PUBLIC_SUPABASE_ANON_KEY",
          "SUPABASE_SERVICE_ROLE_KEY",
        ].map((envVar) => (
          <li key={envVar}>
            <code className="block rounded-lg bg-white px-3 py-1.5 font-mono text-[12px] font-semibold text-amber-900 ring-1 ring-inset ring-amber-200">
              {envVar}
            </code>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-amber-800/80">
        Full instructions are in{" "}
        <span className="font-semibold text-amber-900">SETUP-GUIDE.md</span>.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 hover:underline"
      >
        Return to store
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
