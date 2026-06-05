"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // Wire this to /api/newsletter or your ESP. For now we confirm locally.
    setDone(true);
    toast.success("You're in. Watch your inbox for 10% off your first order.");
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <form onSubmit={submit} className={cn("relative", className)}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="h-[3.25rem] w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 pr-14 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-ember-500"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ember-500 text-white transition-colors hover:bg-ember-600"
      >
        {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
