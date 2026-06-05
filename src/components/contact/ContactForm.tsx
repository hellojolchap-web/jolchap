"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Send } from "lucide-react";

type Subject =
  | ""
  | "General enquiry"
  | "Custom order / quote"
  | "Corporate & bulk"
  | "Wedding stationery"
  | "Reseller programme";

interface FormState {
  name: string;
  email: string;
  subject: Subject;
  message: string;
}

const SUBJECTS: Subject[] = [
  "General enquiry",
  "Custom order / quote",
  "Corporate & bulk",
  "Wedding stationery",
  "Reseller programme",
];

const inputBase =
  "w-full rounded-xl border border-onyx-200 bg-white px-4 py-3 text-[15px] text-onyx-900 placeholder:text-onyx-400 ring-0 transition-all duration-200 focus:border-ember-500 focus:outline-none focus:ring-2 focus:ring-ember-500/20";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold uppercase tracking-widest text-onyx-500">
      {children}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[13px] text-ember-600">{msg}</p>;
}

export function ContactForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) {
      e.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "That doesn't look like a valid email.";
    }
    if (!form.subject) e.subject = "Please choose a subject.";
    if (form.message.trim().length < 10)
      e.message = "Please write at least a few words so we can help you properly.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate network latency — no real backend
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-5 rounded-3xl bg-white px-8 py-14 text-center shadow-card ring-1 ring-onyx-100",
          className
        )}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-50">
          <CheckCircle2 className="h-8 w-8 text-ember-500" strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tightest text-onyx-950">
            Message received
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-onyx-500">
            Thanks, {form.name.split(" ")[0]}! We aim to reply within one business day.
            For faster help, you can also reach us on WhatsApp.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "rounded-3xl bg-white p-6 shadow-card ring-1 ring-onyx-100 sm:p-8",
        className
      )}
    >
      <h2 className="mb-6 text-xl font-extrabold uppercase tracking-tightest text-onyx-950">
        Send us a message
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <Label htmlFor="cf-name">Full name</Label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Tanvir Ahmed"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={cn(inputBase, errors.name && "border-ember-500 focus:ring-ember-500/20")}
          />
          <FieldError msg={errors.name} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="cf-email">Email address</Label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={cn(inputBase, errors.email && "border-ember-500 focus:ring-ember-500/20")}
          />
          <FieldError msg={errors.email} />
        </div>
      </div>

      {/* Subject */}
      <div className="mt-5">
        <Label htmlFor="cf-subject">Subject</Label>
        <select
          id="cf-subject"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value as Subject }))}
          className={cn(
            inputBase,
            "cursor-pointer appearance-none",
            form.subject === "" && "text-onyx-400",
            errors.subject && "border-ember-500 focus:ring-ember-500/20"
          )}
        >
          <option value="" disabled>
            Choose a topic…
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <FieldError msg={errors.subject} />
      </div>

      {/* Message */}
      <div className="mt-5">
        <Label htmlFor="cf-message">Message</Label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Tell us what you need — product type, quantity, your artwork or design idea, any deadline we should know about…"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(
            inputBase,
            "resize-none",
            errors.message && "border-ember-500 focus:ring-ember-500/20"
          )}
        />
        <FieldError msg={errors.message} />
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-onyx-400">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="underline hover:text-ember-600">
          Privacy Policy
        </a>
        . We never share your data with third parties.
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-6 w-full"
        disabled={submitting}
      >
        {submitting ? (
          "Sending…"
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
