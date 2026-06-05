"use client";

import { useCallback, useRef, useState } from "react";
import {
  UploadCloud,
  Loader2,
  X,
  ImageIcon,
  Sparkles,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface UploadResponse {
  url?: string;
  path?: string;
  bytes?: number;
  error?: string;
}

type SingleProps = {
  multiple?: false;
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
};

type MultiProps = {
  multiple: true;
  value?: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  className?: string;
};

type Props = SingleProps | MultiProps;

const HELPER = "Images are automatically optimised & converted to WebP on upload.";

/**
 * Drag-and-drop / click image uploader. Posts each file to /api/upload, which
 * transcodes to WebP server-side, and surfaces the returned public URL.
 *
 * Single mode → onChange(url). Multiple mode → onChange(urls[]).
 * Gracefully reports the 501 (storage not configured) response via a toast.
 */
export function ImageUploader(props: Props) {
  const { multiple = false, label, className } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  // Normalise current value to an array for rendering.
  const urls: string[] = multiple
    ? ((props.value as string[] | undefined) ?? [])
    : props.value
      ? [props.value as string]
      : [];

  const emit = useCallback(
    (next: string[]) => {
      if (multiple) {
        (props.onChange as (u: string[]) => void)(next);
      } else {
        (props.onChange as (u: string) => void)(next[0] ?? "");
      }
    },
    [multiple, props]
  );

  async function uploadOne(file: File): Promise<string | null> {
    const body = new FormData();
    body.append("file", file);

    let res: Response;
    try {
      res = await fetch("/api/upload", { method: "POST", body });
    } catch {
      toast.error("Network error during upload.");
      return null;
    }

    let data: UploadResponse = {};
    try {
      data = (await res.json()) as UploadResponse;
    } catch {
      /* fall through to status-based handling */
    }

    if (!res.ok || !data.url) {
      if (res.status === 501) {
        toast.error(
          data.error ??
            "Storage isn't configured. Add SUPABASE_SERVICE_ROLE_KEY and a public 'media' bucket."
        );
      } else {
        toast.error(data.error ?? "Upload failed. Please try again.");
      }
      return null;
    }

    const kb = data.bytes ? Math.max(1, Math.round(data.bytes / 1024)) : null;
    toast.success(`Converted to WebP${kb ? ` · ${kb} KB` : ""}.`);
    return data.url;
  }

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) {
        toast.error("Please drop image files only.");
        return;
      }

      setBusy(true);
      try {
        if (multiple) {
          const uploaded: string[] = [];
          for (const file of files) {
            const url = await uploadOne(file);
            if (url) uploaded.push(url);
          }
          if (uploaded.length) emit([...urls, ...uploaded]);
        } else {
          const url = await uploadOne(files[0]);
          if (url) emit([url]);
        }
      } finally {
        setBusy(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, urls, emit]
  );

  function removeAt(index: number) {
    const next = urls.filter((_, i) => i !== index);
    emit(next);
  }

  function moveItem(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= urls.length) return;
    const next = [...urls];
    [next[index], next[target]] = [next[target], next[index]];
    emit(next);
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest text-onyx-500">
          {label}
        </label>
      )}

      {/* Dropzone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !busy && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !busy) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!busy) void handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragging
            ? "border-ember-500 bg-ember-50/60"
            : "border-onyx-200 bg-onyx-50/40 hover:border-ember-300 hover:bg-ember-50/30",
          busy && "pointer-events-none opacity-70"
        )}
      >
        <span
          className={cn(
            "grid h-12 w-12 place-items-center rounded-xl transition-colors",
            dragging ? "bg-ember-500 text-white" : "bg-white text-ember-600 ring-1 ring-onyx-100"
          )}
        >
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <UploadCloud className="h-5 w-5" />
          )}
        </span>
        <p className="text-sm font-semibold text-onyx-800">
          {busy ? "Converting & uploading…" : "Drop image here or click to browse"}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-onyx-400">
          <Sparkles className="h-3.5 w-3.5 text-ember-500" />
          {HELPER}
        </p>
        <p className="text-[11px] text-onyx-300">PNG, JPG, GIF, AVIF · up to 8 MB</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          hidden
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {urls.length > 0 && (
        <div
          className={cn(
            "grid gap-3",
            multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"
          )}
        >
          {urls.map((url, i) => (
            <figure
              key={`${url}-${i}`}
              className="group relative overflow-hidden rounded-xl border border-onyx-100 bg-onyx-50"
            >
              <div className={cn("relative w-full", multiple ? "aspect-square" : "aspect-[4/3]")}>
                {/* Uploaded assets may be on the Supabase domain (not in next.config
                    remotePatterns), so use a plain img to avoid optimiser errors. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Upload ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Order controls (multiple only) */}
              {multiple && urls.length > 1 && (
                <div className="absolute left-1.5 top-1.5 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => moveItem(i, -1)}
                    disabled={i === 0}
                    aria-label="Move earlier"
                    className="grid h-7 w-7 place-items-center rounded-md bg-onyx-950/70 text-white backdrop-blur transition-colors hover:bg-onyx-950 disabled:opacity-30"
                  >
                    <GripVertical className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Primary badge for first image in multiple mode */}
              {multiple && i === 0 && (
                <span className="absolute left-1.5 bottom-1.5 rounded-md bg-ember-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                  Primary
                </span>
              )}

              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-md bg-onyx-950/70 text-white opacity-0 backdrop-blur transition-all hover:bg-ember-500 group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </figure>
          ))}

          {/* Add-more tile for multiple */}
          {multiple && (
            <button
              type="button"
              onClick={() => !busy && inputRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-onyx-200 text-onyx-300 transition-colors hover:border-ember-300 hover:text-ember-500"
              aria-label="Add more images"
            >
              <ImageIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
