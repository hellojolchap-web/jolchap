import { Wand2, ImageDown, Maximize2, ShieldCheck, Database } from "lucide-react";

import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { STORAGE_BUCKET } from "@/lib/supabase/config";
import { MediaPlayground } from "@/components/admin/MediaPlayground";
import { Panel, NotConfiguredNotice } from "@/components/admin/AdminUI";

export default function AdminMediaPage() {
  const storageReady = isSupabaseAdminConfigured();

  const steps = [
    {
      icon: Maximize2,
      title: "Auto-orient & resize",
      body: "EXIF rotation is corrected and the image is scaled to fit within 1600px — never upscaled.",
    },
    {
      icon: Wand2,
      title: "Transcode to WebP",
      body: "Any format (PNG, JPG, GIF, AVIF) is re-encoded to WebP at quality 82 for a sharp, lightweight result.",
    },
    {
      icon: Database,
      title: "Store & return a URL",
      body: `The optimised file is uploaded to the public '${STORAGE_BUCKET}' bucket and a CDN URL is returned.`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-ember-600">Media</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
          Image pipeline
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-onyx-500">
          Drop in any image and watch it get optimised and converted to WebP
          automatically. Use this playground to generate ready-to-use asset URLs.
        </p>
      </div>

      {!storageReady && (
        <NotConfiguredNotice
          title="Connect Supabase Storage to enable uploads"
          detail="Conversion runs locally, but storing the result and returning a URL needs the service-role key and a public 'media' bucket."
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Playground */}
        <Panel className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ember-50 text-ember-600">
              <ImageDown className="h-4 w-4" />
            </span>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
              Upload &amp; convert
            </h2>
          </div>
          <MediaPlayground />
        </Panel>

        {/* Explainer */}
        <div className="space-y-4">
          <Panel className="p-5 sm:p-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
              How it works
            </h2>
            <ol className="mt-4 space-y-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-3">
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-onyx-950 text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-onyx-900">
                        <span className="mr-1.5 text-ember-500">{i + 1}.</span>
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-onyx-500">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Panel>

          <div className="flex items-start gap-3 rounded-2xl border border-onyx-100 bg-onyx-50/50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-ember-500" />
            <p className="text-xs leading-relaxed text-onyx-500">
              Conversion happens server-side via{" "}
              <code className="font-mono text-[11px] text-onyx-700">sharp</code> in the{" "}
              <code className="font-mono text-[11px] text-onyx-700">/api/upload</code> route.
              Maximum upload size is 8&nbsp;MB per image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
