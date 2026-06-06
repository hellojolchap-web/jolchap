"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { htmlToText, textToHtml } from "@/lib/admin/richtext";
import { fieldArea } from "./FormKit";
import { cn } from "@/lib/utils";

/**
 * Write-normally editor: the user types plain text (blank line = new
 * paragraph) and it's stored as clean HTML. Supports light markdown:
 * **bold**, *italic*, - bullets, 1. numbers, ## headings, [text](link).
 */
export function RichTextField({
  id,
  value,
  onChange,
  rows = 9,
  placeholder,
}: {
  id?: string;
  value: string;
  onChange: (html: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const [text, setText] = useState(() => htmlToText(value));
  const [preview, setPreview] = useState(false);

  const update = (next: string) => {
    setText(next);
    onChange(textToHtml(next));
  };

  return (
    <div>
      <textarea
        id={id}
        value={text}
        onChange={(e) => update(e.target.value)}
        rows={rows}
        placeholder={
          placeholder ??
          "Write normally — just type.\n\nLeave a blank line to start a new paragraph.\n\nUse **bold**, *italics*, start a line with - for a bullet, or ## for a heading."
        }
        className={cn(fieldArea, "leading-relaxed")}
      />

      <div className="mt-1.5 flex items-center justify-between gap-3">
        <p className="text-[11px] text-onyx-400">
          Blank line = new paragraph · <strong>**bold**</strong> · <em>*italic*</em> · <code>-</code> bullet · <code>##</code> heading
        </p>
        <button
          type="button"
          onClick={() => setPreview((v) => !v)}
          className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-ember-600 hover:text-ember-700"
        >
          {preview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {preview ? "Hide preview" : "Preview"}
        </button>
      </div>

      {preview && (
        <div className="mt-2 rounded-2xl border border-onyx-200 bg-white p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-onyx-300">
            Preview
          </p>
          {text.trim() ? (
            <div
              className="prose prose-jolchap prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: textToHtml(text) }}
            />
          ) : (
            <p className="text-sm text-onyx-400">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
