"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

/**
 * Signs the admin out of Supabase, then returns to the login screen.
 * Works even when Supabase isn't configured (just routes back to /admin/login).
 */
export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    try {
      if (isSupabaseConfigured()) {
        await createClient().auth.signOut();
      }
    } catch {
      // Non-fatal — we still want to leave the admin area.
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={pending}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50",
        className
      )}
    >
      <LogOut className="h-[18px] w-[18px]" />
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
