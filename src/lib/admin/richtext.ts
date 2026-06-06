/* ──────────────────────────────────────────────────────────────────────────
   Lightweight text ⇄ HTML helpers for the admin editor, so content can be
   written in plain language (no HTML tags) yet still stored/rendered as clean
   HTML. Supports: blank-line paragraphs, **bold**, *italic*, - bullets,
   1. numbered lists, ## / ### headings, and [text](https://link).
   ────────────────────────────────────────────────────────────────────────── */

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Apply inline formatting to an already-escaped string. */
function inline(escaped: string): string {
  return escaped
    .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

/** Convert friendly plain text into sanitised HTML. */
export function textToHtml(text: string): string {
  const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);

  return blocks
    .filter((b) => b.trim().length > 0)
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trimEnd());

      if (lines.length === 1 && /^###\s+/.test(lines[0])) {
        return `<h3>${inline(escapeHtml(lines[0].replace(/^###\s+/, "")))}</h3>`;
      }
      if (lines.length === 1 && /^##\s+/.test(lines[0])) {
        return `<h2>${inline(escapeHtml(lines[0].replace(/^##\s+/, "")))}</h2>`;
      }
      if (lines.every((l) => /^[-*]\s+/.test(l))) {
        const items = lines
          .map((l) => `<li>${inline(escapeHtml(l.replace(/^[-*]\s+/, "")))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
        const items = lines
          .map((l) => `<li>${inline(escapeHtml(l.replace(/^\d+[.)]\s+/, "")))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }
      return `<p>${lines.map((l) => inline(escapeHtml(l))).join("<br>")}</p>`;
    })
    .join("");
}

/** Convert stored HTML back into friendly plain text for editing. */
export function htmlToText(html: string): string {
  if (!html) return "";

  let t = html.replace(/\r\n/g, "\n");

  t = t
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/p\s*>/gi, "\n\n")
    .replace(/<\/div\s*>/gi, "\n\n")
    .replace(/<h2[^>]*>/gi, "## ")
    .replace(/<\/h2\s*>/gi, "\n\n")
    .replace(/<h3[^>]*>/gi, "### ")
    .replace(/<\/h3\s*>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/li\s*>/gi, "\n")
    .replace(/<\/(ul|ol)\s*>/gi, "\n")
    .replace(/<(strong|b)\s*>/gi, "**")
    .replace(/<\/(strong|b)\s*>/gi, "**")
    .replace(/<(em|i)\s*>/gi, "*")
    .replace(/<\/(em|i)\s*>/gi, "*")
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a\s*>/gi, "[$2]($1)");

  // strip any remaining tags
  t = t.replace(/<[^>]+>/g, "");

  // decode common entities
  t = t
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  return t.replace(/\n{3,}/g, "\n\n").trim();
}
