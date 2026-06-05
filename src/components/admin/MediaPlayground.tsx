"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { ImageUploader } from "./ImageUploader";
import { cn } from "@/lib/utils";

/**
 * Interactive demo of the auto-WebP pipeline: upload anything, get back the
 * optimised WebP public URL with a one-click copy.
 */
export function MediaPlayground() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("URL copied to clipboard.");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy — select and copy manually.");
    }
  }

  return (
    <div className="space-y-5">
      <ImageUploader value={url} onChange={(u) => setUrl(u)} />

      {url ? (
        <div className="rounded-2xl border border-onyx-100 bg-white p-4 shadow-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-onyx-500">
            Converted WebP URL
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="min-w-0 flex-1 truncate rounded-xl bg-onyx-50 px-3.5 py-2.5 font-mono text-[13px] text-onyx-800 ring-1 ring-inset ring-onyx-100">
              {url}
            </code>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copy}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors",
                  copied
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                    : "bg-onyx-950 text-white hover:bg-onyx-800"
                )}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-onyx-200 px-3.5 text-sm font-semibold text-onyx-700 transition-colors hover:border-ember-300 hover:text-ember-600"
              >
                <ExternalLink className="h-4 w-4" />
                Open
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-onyx-200 bg-onyx-50/40 px-4 py-3 text-sm text-onyx-400">
          <ImageIcon className="h-4 w-4 flex-shrink-0" />
          Upload an image above to see its optimised WebP URL appear here.
        </div>
      )}
    </div>
  );
}
