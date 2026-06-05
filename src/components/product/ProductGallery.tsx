"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   Jolchap — Product gallery
   Large main stage with a thumbnail rail (vertical on desktop, horizontal on
   mobile), pointer-driven zoom on the main image, and a full-screen lightbox.
   ────────────────────────────────────────────────────────────────────────── */

export function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: string | null;
}) {
  const safeImages = images.length ? images : [];
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const current = safeImages[active] ?? safeImages[0];

  const onMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  if (!current) {
    return (
      <div className="aspect-square w-full rounded-3xl bg-onyx-100" aria-hidden />
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* thumbnail rail */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {safeImages.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${name}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 transition-all lg:h-[5.5rem] lg:w-[5.5rem]",
                i === active
                  ? "ring-2 ring-ember-500"
                  : "ring-onyx-100 hover:ring-onyx-300"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="88px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* main stage */}
      <div className="relative flex-1">
        <div
          ref={stageRef}
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={onMove}
          className="group relative aspect-square w-full overflow-hidden rounded-3xl bg-white ring-1 ring-onyx-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={current}
                alt={name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className={cn(
                  "object-cover transition-transform duration-200 ease-out",
                  zooming ? "scale-[1.7]" : "scale-100"
                )}
                style={
                  zooming
                    ? { transformOrigin: `${origin.x}% ${origin.y}%` }
                    : undefined
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* badge */}
          {badge && (
            <span className="absolute left-4 top-4 rounded-full bg-onyx-950 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {badge}
            </span>
          )}

          {/* expand */}
          <button
            onClick={() => setLightbox(true)}
            aria-label="View full screen"
            className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-onyx-950 shadow-card backdrop-blur transition-all hover:bg-ember-500 hover:text-white"
          >
            <Expand className="h-5 w-5" />
          </button>
        </div>

        {/* dot index (mobile aid) */}
        {safeImages.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
            {safeImages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-5 bg-ember-500" : "w-1.5 bg-onyx-200"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] grid place-items-center bg-onyx-950/92 p-4 backdrop-blur-sm sm:p-10"
            onClick={() => setLightbox(false)}
          >
            <button
              aria-label="Close"
              onClick={() => setLightbox(false)}
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              key={current}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square w-full max-w-3xl overflow-hidden rounded-3xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current}
                alt={name}
                fill
                sizes="(max-width:768px) 92vw, 768px"
                className="object-cover"
              />
            </motion.div>

            {safeImages.length > 1 && (
              <div
                className="absolute inset-x-0 bottom-6 flex justify-center gap-2.5"
                onClick={(e) => e.stopPropagation()}
              >
                {safeImages.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    aria-label={`Image ${i + 1}`}
                    className={cn(
                      "relative h-14 w-14 overflow-hidden rounded-lg ring-2 transition-all",
                      i === active ? "ring-ember-500" : "ring-white/20 hover:ring-white/50"
                    )}
                  >
                    <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
