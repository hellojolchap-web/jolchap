import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Artwork & Size Guide | Jolchap — Custom Print & Personalisation Studio",
  description:
    "How to send artwork for custom printing at Jolchap — file formats, resolution, colour mode, bleed. Plus apparel size chart (S–XXL) and stamp size reference table.",
};

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-onyx-100 shadow-card">
      <table className="w-full min-w-[520px] text-sm">{children}</table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="bg-onyx-950 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-white first:rounded-tl-2xl last:rounded-tr-2xl">
      {children}
    </th>
  );
}

function Td({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <td
      className={`px-4 py-3 text-[14px] leading-snug ${
        highlight
          ? "font-bold text-ember-600"
          : "text-onyx-700"
      }`}
    >
      {children}
    </td>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border-l-4 border-ember-500 bg-ember-50 px-5 py-4 text-[14px] leading-relaxed text-onyx-700">
      <span className="font-bold text-ember-600">Tip: </span>
      {children}
    </div>
  );
}

export default function ArtworkGuidePage() {
  const waHref = whatsappLink(
    siteConfig.contact.whatsapp,
    "Hi Jolchap — I need help preparing my artwork for printing."
  );

  return (
    <>
      <PageHeader
        kicker="Artwork & size guide"
        title="Sending the right files"
        intro="Getting the best print starts with the right artwork. Use this guide to prepare your files correctly — and check our apparel and stamp size charts before ordering."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Support", href: "/contact" },
          { label: "Artwork & Size Guide" },
        ]}
        variant="light"
      />

      <section className="section bg-bone">
        <Container>
          <div className="mx-auto max-w-4xl space-y-20">

            {/* ── Artwork file guide ── */}
            <Reveal>
              <SectionHeading
                kicker="Artwork files"
                title="How to send your artwork"
                intro="The quality of your print is directly related to the quality of the file you provide. Here's what to send — and why it matters."
              />

              <div className="mt-6">
                <TableWrapper>
                  <thead>
                    <tr>
                      <Th>Format</Th>
                      <Th>Best for</Th>
                      <Th>Quality notes</Th>
                      <Th>Accepted?</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-onyx-100 bg-white">
                    {[
                      ["PDF (vector)", "Logos, stamps, text designs, stationery", "Infinite scalability — no pixelation at any size", "Best choice"],
                      ["AI / EPS / SVG (vector)", "Logos, icons, line art", "True vector — scalable and editable", "Best choice"],
                      ["PNG (transparent background)", "Logos, artwork with no background", "300 DPI minimum — will pixelate if too small", "Accepted"],
                      ["JPG / JPEG", "Photo mugs, photo frames, photo prints", "300 DPI minimum — sharp and large file preferred", "Accepted"],
                      ["PSD (Photoshop)", "Layered compositions, photo edits", "Flatten or export to PDF/PNG before sending", "With export"],
                      ["BMP / GIF / low-res JPG", "Screenshots, WhatsApp-forwarded images", "Too low resolution for print quality", "Not accepted"],
                    ].map(([format, best, notes, accepted], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-onyx-50/60"}>
                        <Td highlight>{format}</Td>
                        <Td>{best}</Td>
                        <Td>{notes}</Td>
                        <Td>{accepted}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrapper>
              </div>

              <TipBox>
                If you have a logo saved as a JPG or PNG, look for a vector version first
                — check with your designer or the person who made your logo. A vector file
                (AI, EPS, SVG or PDF) will always give a sharper result than a raster image,
                especially for stamps and fine text.
              </TipBox>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-5 ring-1 ring-onyx-100 shadow-card">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">
                    Resolution: 300 DPI minimum
                  </h4>
                  <p className="text-[13px] leading-relaxed text-onyx-500">
                    DPI (dots per inch) determines print sharpness. 72 DPI (screen
                    resolution) looks fine on your phone but prints blurry. Always supply
                    artwork at 300 DPI or higher at the intended print size. Our team
                    checks resolution before production and will flag files that are too
                    low-res.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-onyx-100 shadow-card">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">
                    Colour mode: CMYK preferred
                  </h4>
                  <p className="text-[13px] leading-relaxed text-onyx-500">
                    Screens display RGB (light-based colour) and printers use CMYK
                    (ink-based). Converting from RGB to CMYK can slightly dull bright
                    neons and vivid colours. For the most accurate result, supply your
                    artwork in CMYK mode. If you're not sure how, send it to us and our
                    design team will convert it for you.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-onyx-100 shadow-card">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">
                    Bleed: 3 mm for stationery
                  </h4>
                  <p className="text-[13px] leading-relaxed text-onyx-500">
                    If your design has a background colour or image that goes to the edge
                    of the page (for business cards, invitation cards, etc.), extend the
                    design 3 mm beyond the trim edge. This "bleed" area is cut off after
                    printing to ensure no white border appears. Keep important text and
                    logos at least 5 mm inside the final trim size.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-onyx-100 shadow-card">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">
                    Fonts: outline or embed them
                  </h4>
                  <p className="text-[13px] leading-relaxed text-onyx-500">
                    If your file uses custom fonts and you're sending an AI or EPS file,
                    convert all text to outlines (Object &gt; Flatten/Outline in
                    Illustrator) or embed the fonts. This prevents text from rendering
                    in a substitute font on our system. PDF and PNG exports don't have
                    this issue.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="hairline" />

            {/* ── Apparel size chart ── */}
            <Reveal>
              <SectionHeading
                kicker="Printed apparel"
                title="Apparel size chart"
                intro="All measurements are in inches, taken as body measurements (not garment measurements). Measure over a light t-shirt for the most accurate result."
              />
              <div className="mt-6">
                <TableWrapper>
                  <thead>
                    <tr>
                      <Th>Size</Th>
                      <Th>Chest (in)</Th>
                      <Th>Body length (in)</Th>
                      <Th>Shoulder width (in)</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-onyx-100 bg-white">
                    {[
                      ["S", "36–38", "27–28", "16.5–17"],
                      ["M", "38–40", "28–29", "17–17.5"],
                      ["L", "40–42", "29–30", "17.5–18"],
                      ["XL", "42–44", "30–31", "18–19"],
                      ["XXL", "44–46", "31–32", "19–20"],
                    ].map(([size, chest, length, shoulder], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-onyx-50/60"}>
                        <Td highlight>{size}</Td>
                        <Td>{chest}</Td>
                        <Td>{length}</Td>
                        <Td>{shoulder}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrapper>
              </div>

              <TipBox>
                Our t-shirts are cut slightly relaxed (not slim fit). If you prefer a
                fitted look, size down. For couple tees where you want a matching
                silhouette, we recommend both sizing down one from your usual size.
              </TipBox>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-5 ring-1 ring-onyx-100 shadow-card">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">
                    How to measure chest
                  </h4>
                  <p className="text-[13px] leading-relaxed text-onyx-500">
                    Measure around the fullest part of your chest, keeping the tape
                    horizontal. Don't pull it tight — leave a finger's width of ease.
                    This is your chest measurement.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-onyx-100 shadow-card">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">
                    Print placement
                  </h4>
                  <p className="text-[13px] leading-relaxed text-onyx-500">
                    Standard front-chest print is centred, starting approximately 7–9 cm
                    below the collar. Full-front and back prints are available on request.
                    Mention your preferred placement in the order notes or design brief.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="hairline" />

            {/* ── Stamp size reference ── */}
            <Reveal>
              <SectionHeading
                kicker="Stamps & seals"
                title="Stamp size reference"
                intro="Choosing the right stamp size depends on how much text or detail your design has and where you'll use it. This table gives guidance for common use cases."
              />
              <div className="mt-6">
                <TableWrapper>
                  <thead>
                    <tr>
                      <Th>Stamp size</Th>
                      <Th>Typical use</Th>
                      <Th>Min. text size</Th>
                      <Th>Lines of text</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-onyx-100 bg-white">
                    {[
                      ["20 mm round", "Monograms, single initial, simple icons", "8 pt", "1–2"],
                      ["30 mm round", "Name + title, small logos, address abbreviation", "6 pt", "2–3"],
                      ["40 mm round", "Logo + business name, address stamps", "6 pt", "3–4"],
                      ["50 mm round", "Detailed logos, multi-line addresses, wax seal bases", "5 pt", "4–5"],
                      ["30 × 50 mm rectangle", "Full address blocks, business info, invoice stamps", "6 pt", "3–4"],
                      ["40 × 60 mm rectangle", "Company stamps with logo + address + contact", "5 pt", "4–6"],
                      ["50 × 70 mm rectangle", "Large company stamps, school/org official stamps", "5 pt", "5–7"],
                    ].map(([size, use, minText, lines], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-onyx-50/60"}>
                        <Td highlight>{size}</Td>
                        <Td>{use}</Td>
                        <Td>{minText}</Td>
                        <Td>{lines}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrapper>
              </div>

              <TipBox>
                When in doubt, go slightly larger — a stamp with a bit of breathing room
                around the design looks cleaner and more professional than one where the
                text is tightly packed. Very small text (under 5 pt) can become unclear
                in rubber, especially for thin or decorative fonts.
              </TipBox>

              <div className="mt-6">
                <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-3">
                  Wax seals
                </h4>
                <p className="text-[14px] leading-relaxed text-onyx-600">
                  Our wax seal brass bases are available in 25 mm and 30 mm diameters.
                  Designs for wax seals should be simple — bold lines, minimal fine
                  detail, no small text below 8 pt. Highly detailed designs may not
                  transfer cleanly in wax. Our team can simplify your design if needed
                  and will flag any concerns before engraving.
                </p>
              </div>
            </Reveal>

            <div className="hairline" />

            {/* CTA */}
            <Reveal>
              <div className="rounded-3xl bg-onyx-950 p-8 text-center">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tightest text-white mb-3">
                  Not sure about your artwork?
                </h3>
                <p className="text-[15px] text-white/60 mb-6 max-w-md mx-auto">
                  Send us your file and we'll check it for free before you commit to
                  anything. If there's a problem, we'll tell you exactly what to fix —
                  or fix it for you.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button href={waHref} variant="primary" size="md">
                    <MessageCircle className="h-4 w-4" />
                    Send artwork via WhatsApp
                  </Button>
                  <Button href="/contact" variant="light" size="md">
                    Send us a message
                  </Button>
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </section>
    </>
  );
}
