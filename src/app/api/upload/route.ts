import { NextResponse } from "next/server";

import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { STORAGE_BUCKET } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { toWebp, webpFilename } from "@/lib/image";

/** sharp needs the Node.js runtime — it won't run on the Edge runtime. */
export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/**
 * POST /api/upload
 *
 * Accepts a multipart form with a single `file` field (an image Blob),
 * transcodes it to optimised WebP and stores it in the Supabase Storage
 * bucket. Returns the public URL of the converted asset.
 *
 * Status codes:
 *  • 400 — missing/invalid file, wrong type, or over the size limit
 *  • 501 — Supabase service-role credentials not configured
 *  • 502 — storage upload failed
 *  • 500 — unexpected conversion/processing error
 *  • 200 — { url, path, bytes }
 */
export async function POST(request: Request) {
  let file: File | null = null;

  try {
    const formData = await request.formData();
    const value = formData.get("file");
    if (value instanceof File) {
      file = value;
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid form data. Send the image as multipart/form-data." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { error: "No file provided. Attach an image under the `file` field." },
      { status: 400 }
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files can be uploaded." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is too large. Maximum size is 8 MB." },
      { status: 400 }
    );
  }

  // Convert to WebP first so we can fail fast on a corrupt image regardless of
  // whether storage is configured.
  let webp: Buffer;
  let filename: string;
  try {
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    webp = await toWebp(inputBuffer);
    filename = webpFilename(file.name || "image");
  } catch {
    return NextResponse.json(
      { error: "That image could not be processed. Try a different file." },
      { status: 400 }
    );
  }

  // Storage requires the privileged service-role key.
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Image storage is not configured. Add SUPABASE_SERVICE_ROLE_KEY and create a public 'media' bucket to enable uploads.",
      },
      { status: 501 }
    );
  }

  const path = `uploads/${Date.now()}-${filename}`;

  try {
    const admin = createAdminClient();

    const { error: uploadError } = await admin.storage
      .from(STORAGE_BUCKET)
      .upload(path, webp, {
        contentType: "image/webp",
        upsert: true,
        cacheControl: "31536000",
      });

    if (uploadError) {
      return NextResponse.json(
        {
          error: `Upload failed: ${uploadError.message}. Confirm the '${STORAGE_BUCKET}' bucket exists and is public.`,
        },
        { status: 502 }
      );
    }

    const {
      data: { publicUrl },
    } = admin.storage.from(STORAGE_BUCKET).getPublicUrl(path);

    return NextResponse.json(
      { url: publicUrl, path, bytes: webp.byteLength },
      { status: 200 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected upload error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
