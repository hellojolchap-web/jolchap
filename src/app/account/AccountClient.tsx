"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Package,
  Heart,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { ForgeMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

const input =
  "h-12 w-full rounded-xl border border-onyx-200 bg-white pl-11 pr-11 text-[15px] text-onyx-900 outline-none transition-colors placeholder:text-onyx-300 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/20";

export function AccountClient() {
  const configured = isSupabaseConfigured();
  const supabase = configured ? createClient() : null;

  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<Mode>("signin");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.name },
            emailRedirectTo:
              typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Account created — you're in!");
        } else {
          toast.success("Check your inbox to confirm your email, then sign in.");
          setMode("signin");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    toast.success("Signed out.");
  }

  /* ── Not configured ── */
  if (!configured) {
    return (
      <Shell>
        <div className="text-center">
          <ForgeMark className="mx-auto h-14 w-14" />
          <h1 className="mt-6 text-2xl font-extrabold uppercase tracking-tightest text-onyx-950">
            Accounts coming soon
          </h1>
          <p className="mt-3 text-onyx-500">
            Customer accounts switch on once the store is connected to its database.
          </p>
          <Button href="/shop" className="mt-7" size="lg">
            Continue shopping
          </Button>
        </div>
      </Shell>
    );
  }

  /* ── Loading ── */
  if (!ready) {
    return (
      <Shell>
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-7 w-7 animate-spin text-ember-500" />
        </div>
      </Shell>
    );
  }

  /* ── Signed in: My Account ── */
  if (user) {
    const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "there";
    const initials = name.slice(0, 2).toUpperCase();
    const tiles = [
      { icon: Package, label: "Your orders", copy: "Track and reorder", href: "/contact#track" },
      { icon: Heart, label: "Saved designs", copy: "Your wishlist", href: "/shop" },
      { icon: MapPin, label: "Addresses", copy: "Delivery details", href: "/account" },
      { icon: Sparkles, label: "Start a custom order", copy: "Make something new", href: "/shop" },
    ];
    return (
      <Shell wide>
        <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-onyx-950 text-lg font-bold text-white">
              {initials}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">
                My account
              </p>
              <h1 className="text-2xl font-extrabold tracking-tightest text-onyx-950">
                Hi, {name} 👋
              </h1>
              <p className="text-sm text-onyx-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-onyx-200 px-5 py-2.5 text-sm font-semibold text-onyx-700 transition-colors hover:border-ember-500 hover:text-ember-600"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tiles.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="group flex items-center gap-4 rounded-2xl border border-onyx-100 bg-white p-5 transition-all hover:border-ember-500/40 hover:shadow-card"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ember-50 text-ember-600">
                <t.icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="font-bold text-onyx-950">{t.label}</p>
                <p className="text-sm text-onyx-400">{t.copy}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-onyx-300 transition-transform group-hover:translate-x-0.5 group-hover:text-ember-500" />
            </Link>
          ))}
        </div>
      </Shell>
    );
  }

  /* ── Signed out: auth form ── */
  return (
    <Shell>
      <div className="mb-7 text-center">
        <ForgeMark className="mx-auto h-12 w-12" />
        <h1 className="mt-5 text-2xl font-extrabold uppercase tracking-tightest text-onyx-950">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-onyx-500">
          {mode === "signin"
            ? "Sign in to track orders and check out faster."
            : "Join Jolchap to save designs and reorder in a tap."}
        </p>
      </div>

      {/* tabs */}
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-onyx-100 p-1">
        {(["signin", "signup"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-xl py-2.5 text-sm font-bold transition-all",
              mode === m ? "bg-white text-onyx-950 shadow-sm" : "text-onyx-400 hover:text-onyx-700"
            )}
          >
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === "signup" && (
          <div className="relative">
            <UserIcon className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-onyx-300" />
            <input
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={input}
              required
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-onyx-300" />
          <input
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={input}
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-onyx-300" />
          <input
            type={showPw ? "text" : "password"}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            className={input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-onyx-300 hover:text-onyx-600"
          >
            {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
          </button>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "signin" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-onyx-500">
        {mode === "signin" ? "New to Jolchap? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="font-semibold text-ember-600 hover:text-ember-700"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-onyx-100 pt-5 text-[11px] font-medium text-onyx-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-ember-500" /> Secure checkout
        </span>
        <span className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5 text-ember-500" /> Order tracking
        </span>
        <span className="flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-ember-500" /> Saved designs
        </span>
      </div>
    </Shell>
  );
}

/* Page chrome wrapper. */
function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-bone py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ember-500/10 blur-[120px]" />
      <Container className="relative">
        <div
          className={cn(
            "mx-auto rounded-3xl border border-onyx-100 bg-white/80 p-7 shadow-card backdrop-blur-sm sm:p-9",
            wide ? "max-w-3xl" : "max-w-md"
          )}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
