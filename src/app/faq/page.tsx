import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { pageMetadata, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about ordering, customisation, printing, delivery and returns at Jolchap.",
  path: "/faq",
});

interface FaqGroup {
  heading: string;
  id: string;
  items: AccordionItem[];
}

const faqGroups: FaqGroup[] = [
  {
    heading: "Ordering & Customisation",
    id: "ordering",
    items: [
      {
        q: "How do I send my artwork or design?",
        a: (
          <p>
            You can share your artwork in several ways: upload it directly during
            checkout, send it to us via WhatsApp, or email it to{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-ember-600 hover:underline">
              {siteConfig.contact.email}
            </a>{" "}
            with your order number. If you don't have a ready-made design, just describe
            what you want — our in-house design team will create a draft for you to
            review before production begins.
          </p>
        ),
      },
      {
        q: "Do I get a preview of my design before you print it?",
        a: (
          <p>
            Yes — always. We send a free digital preview (a mockup of exactly how your
            order will look) before we start production. You can request changes at this
            stage at no extra cost. We only begin printing once you have given your
            written approval. This applies to every order, no exceptions.
          </p>
        ),
      },
      {
        q: "Is there a minimum order quantity?",
        a: (
          <p>
            Most of our products have no minimum — you can order a single custom mug, one
            personalised keychain, or a single rubber stamp. A few products (such as
            screen-printed t-shirts and some stationery lines) have a minimum of 10–25
            pieces due to the setup cost of the printing process. The minimum is shown
            clearly on each product page. For bulk or corporate orders of 25+ pieces,{" "}
            <a href="/contact#wholesale" className="font-semibold text-ember-600 hover:underline">
              contact us for a volume quote
            </a>
            .
          </p>
        ),
      },
      {
        q: "What file formats do you accept?",
        a: (
          <div className="space-y-2">
            <p>We accept the following file formats:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Best quality:</strong> PDF, AI (Adobe Illustrator), EPS, or SVG — vector files that can be scaled without any loss of sharpness.</li>
              <li><strong>Acceptable for most products:</strong> PNG with a transparent background at 300 DPI or higher. CMYK colour mode is preferred over RGB.</li>
              <li><strong>For photo products (mugs, frames, photo prints):</strong> High-resolution JPG or PNG at 300 DPI minimum. Blurry or low-resolution photos will appear soft in print — we'll let you know if your file isn't high enough quality before we proceed.</li>
            </ul>
            <p>
              Not sure about your file? Send it to us and we'll check it for free. See our{" "}
              <a href="/size-guide" className="font-semibold text-ember-600 hover:underline">
                Artwork &amp; File Guide
              </a>{" "}
              for full specifications.
            </p>
          </div>
        ),
      },
      {
        q: "Can I make changes after I've placed an order?",
        a: (
          <p>
            Changes can be made before you approve the design preview — at that stage
            we haven't touched your blanks yet, so amendments are free. Once you've
            approved the design and production has started, changes are unfortunately not
            possible. If you realise there's a typo or error after approving, contact us
            immediately via WhatsApp — if production hasn't started yet we may still be
            able to help.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Printing & Products",
    id: "printing",
    items: [
      {
        q: "What printing methods do you use?",
        a: (
          <div className="space-y-2">
            <p>We use different methods depending on the product:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Laser engraving:</strong> Rubber stamps, wooden items, keychains, name plates. Highly precise and permanent.</li>
              <li><strong>Sublimation heat-press:</strong> Mugs, bottles, tumblers, polyester apparel, mouse pads. Full-colour, photo-quality, dishwasher-safe on mugs.</li>
              <li><strong>DTF (Direct-to-Film) transfer:</strong> Cotton and cotton-blend t-shirts, hoodies and tote bags. Soft feel, vibrant colours, excellent wash durability.</li>
              <li><strong>Screen printing:</strong> High-volume apparel orders where a limited number of colours are needed. Most cost-effective at 50+ pieces.</li>
              <li><strong>Digital offset printing:</strong> Business cards, wedding stationery, invitation cards and packaging.</li>
            </ul>
          </div>
        ),
      },
      {
        q: "How durable is the print on t-shirts?",
        a: (
          <p>
            Our DTF prints are highly durable when cared for correctly. They resist
            peeling and cracking for 40–50+ washes when you follow the care instructions:
            wash inside-out in cold water (30°C or below), avoid tumble drying on high
            heat, and do not iron directly on the print. Screen-printed designs are
            similarly durable. Sublimated designs on polyester are permanent and will
            last the life of the garment.
          </p>
        ),
      },
      {
        q: "Can I use my own photos on mugs or apparel?",
        a: (
          <p>
            Absolutely — photo personalisation is one of our most popular services. For
            the best results on mugs and frames, send a photo that is at least 1 MB in
            file size and well-lit. Blurry, dark, or very small photos may not print
            sharply. Our design team will review your photo and flag any quality concerns
            before approving the mockup. Portrait photos, group photos, and pet photos
            all print beautifully on our sublimated products.
          </p>
        ),
      },
      {
        q: "Will the printed colours exactly match my screen?",
        a: (
          <p>
            Screens display colours in RGB (light-based) and printers work in CMYK
            (ink-based), so there is always a small difference. Colours may print slightly
            more muted than they appear on a phone or laptop screen. Bright neons and very
            vivid greens are the most likely to shift. If colour accuracy is critical,
            please mention it when placing your order — we can do a test print on request
            (charges may apply for some products). For standard orders, the difference is
            subtle and most customers are very happy with the result.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Delivery",
    id: "delivery",
    items: [
      {
        q: "Do you deliver outside Dhaka?",
        a: (
          <p>
            Yes — we deliver nationwide across Bangladesh via our courier partners Pathao,
            Sundarban Courier, and RedX. Dhaka deliveries typically arrive within 1–2
            working days of dispatch. Deliveries to Chittagong, Sylhet, Rajshahi, Khulna
            and other major cities take 2–4 working days. Remote upazilas may take 3–5
            working days. See our full{" "}
            <a href="/shipping" className="font-semibold text-ember-600 hover:underline">
              delivery policy
            </a>{" "}
            for rates and timelines.
          </p>
        ),
      },
      {
        q: "How long does production take before my order ships?",
        a: (
          <div className="space-y-2">
            <p>
              Production time depends on the product and order size. Typical timelines
              after design approval:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Stamps &amp; seals:</strong> 1–2 working days</li>
              <li><strong>Mugs, keychains, small gifts:</strong> 1–2 working days</li>
              <li><strong>T-shirts &amp; apparel (1–10 pieces):</strong> 2–3 working days</li>
              <li><strong>Bulk apparel (10+ pieces):</strong> 3–5 working days</li>
              <li><strong>Wedding stationery &amp; business cards:</strong> 2–4 working days</li>
            </ul>
            <p>
              During Eid, Valentine's Day, and other peak seasons, production times
              may be extended by 1–2 days. We always communicate any delays proactively.
            </p>
          </div>
        ),
      },
      {
        q: "What are the delivery charges?",
        a: (
          <p>
            Delivery within Dhaka city costs ৳60–৳80 depending on the courier. Deliveries
            outside Dhaka cost ৳120–৳150 for standard parcels. Charges are calculated at
            checkout based on your location and parcel weight. See our{" "}
            <a href="/shipping" className="font-semibold text-ember-600 hover:underline">
              shipping policy
            </a>{" "}
            for the full rate table.
          </p>
        ),
      },
      {
        q: "Do you offer cash on delivery (COD)?",
        a: (
          <p>
            Yes — we offer cash on delivery for most products across Bangladesh. Because
            custom/personalised orders are made specifically for you and cannot be resold,
            we require a 50% advance payment for COD orders over ৳1,000. The remaining
            balance is paid to the courier upon delivery. Full prepayment is required for
            orders with complex or rush production. COD availability will be shown at
            checkout for your order.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Returns & Issues",
    id: "returns",
    items: [
      {
        q: "Can I return a personalised item?",
        a: (
          <p>
            Because every Jolchap order is made to order specifically for you, we are
            unable to accept returns or offer refunds for change of mind on personalised
            items. This includes all printed apparel, mugs, stamps, stationery, and
            gifts that carry your name, photo, logo, or custom text. Please review
            your design preview carefully before approving production. See our full{" "}
            <a href="/returns" className="font-semibold text-ember-600 hover:underline">
              returns policy
            </a>
            .
          </p>
        ),
      },
      {
        q: "What if there is a printing error or defect on my order?",
        a: (
          <p>
            If your order arrives with a printing error (wrong text, missing element,
            misaligned print) or a manufacturing defect (cracked mug, torn fabric,
            faded print), we will reprint or refund it at no cost to you. Please
            photograph the issue and contact us within 48 hours of receiving your order —
            by WhatsApp or email with your order number and photos. We'll arrange a
            free replacement as quickly as possible, usually within 2–3 working days.
          </p>
        ),
      },
      {
        q: "What if my order was damaged during delivery?",
        a: (
          <p>
            If your parcel arrives visibly damaged, photograph both the packaging and the
            contents before unpacking further. Contact us within 48 hours with the photos.
            We will file a claim with the courier and send a replacement at no extra
            charge. We strongly recommend not refusing the delivery — accepting a damaged
            parcel and photographing the damage is the best way to ensure a smooth
            replacement process.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Corporate & Bulk",
    id: "corporate",
    items: [
      {
        q: "How do I place a bulk or corporate order?",
        a: (
          <p>
            For orders of 25+ pieces or orders requiring corporate invoicing, please{" "}
            <a href="/contact#wholesale" className="font-semibold text-ember-600 hover:underline">
              contact our corporate team
            </a>{" "}
            directly via email or WhatsApp with your requirements: product type, quantity,
            design brief or artwork, and your delivery deadline. We'll send a detailed
            quote within one working day. We work with companies, schools, NGOs, event
            management companies, and wedding planners regularly.
          </p>
        ),
      },
      {
        q: "Can you add our company logo to products?",
        a: (
          <p>
            Yes — branded merchandise is one of our specialities. We can print your
            company logo on t-shirts, tote bags, mugs, notebooks, business card holders,
            rubber stamps, and much more. Supply your logo as a vector file (AI, EPS, PDF,
            or SVG) for the sharpest result. We offer design support if you need help
            adapting your logo for print. Volume pricing applies at 25+ units of any
            single product.
          </p>
        ),
      },
      {
        q: "Do you issue official invoices for corporate orders?",
        a: (
          <p>
            Yes. We issue official VAT invoices for all corporate and bulk orders.
            Please mention your company name, BIN (if applicable), and billing address
            when placing your enquiry. We accept bank transfer and bKash/Nagad for
            corporate orders; please let us know your preferred payment method and we
            will arrange accordingly.
          </p>
        ),
      },
    ],
  },
];

const FAQ_ITEMS = [
  { q: "How do I send my artwork or design?", a: "You can share your artwork by uploading it during checkout, sending it via WhatsApp, or emailing it with your order number. If you don't have a design, our in-house design team will create a draft for you to review before production begins." },
  { q: "Do I get a preview of my design before you print it?", a: "Yes — always. We send a free digital preview before we start production. You can request changes at no extra cost. We only begin printing once you have given your written approval." },
  { q: "Is there a minimum order quantity?", a: "Most products have no minimum — you can order a single item. Some products such as screen-printed t-shirts have a minimum of 10–25 pieces due to setup cost. For bulk orders of 25+ pieces, contact us for a volume quote." },
  { q: "What file formats do you accept?", a: "Best: PDF, AI, EPS, or SVG vector files. Accepted: PNG with transparent background at 300 DPI or higher. For photo products: high-resolution JPG or PNG at 300 DPI minimum. We do not accept BMP, GIF or low-resolution images." },
  { q: "Can I make changes after I've placed an order?", a: "Changes can be made before you approve the design preview. Once you have approved and production has started, changes are not possible. Contact us immediately via WhatsApp if you spot an error after approving." },
  { q: "What printing methods do you use?", a: "Laser engraving for stamps and wooden items; sublimation heat-press for mugs and polyester apparel; DTF transfer for cotton t-shirts and tote bags; screen printing for high-volume apparel; digital offset for stationery and business cards." },
  { q: "How durable is the print on t-shirts?", a: "Our DTF prints resist peeling and cracking for 40–50+ washes when cared for correctly: wash inside-out in cold water, avoid high-heat tumble drying, and do not iron directly on the print." },
  { q: "Can I use my own photos on mugs or apparel?", a: "Yes — photo personalisation is one of our most popular services. For best results send a photo at least 1 MB in size and well-lit. Our design team will review and flag any quality concerns before approving the mockup." },
  { q: "Will the printed colours exactly match my screen?", a: "Screens display RGB and printers work in CMYK, so there is always a small difference. Colours may print slightly more muted. If colour accuracy is critical, mention it when placing your order." },
  { q: "Do you deliver outside Dhaka?", a: "Yes — we deliver nationwide across Bangladesh via Pathao, Sundarban Courier, and RedX. Dhaka deliveries arrive within 1–2 working days of dispatch. Outside Dhaka takes 2–5 working days depending on location." },
  { q: "How long does production take before my order ships?", a: "After design approval: stamps and seals 1–2 days; mugs and small gifts 1–2 days; t-shirts (1–10 pieces) 2–3 days; bulk apparel (10+) 3–5 days; stationery and business cards 2–4 days. Peak seasons may add 1–2 days." },
  { q: "What are the delivery charges?", a: "Dhaka city: ৳60–৳80. Outside Dhaka: ৳120–৳150 for standard parcels. Exact charges are calculated at checkout based on your location and parcel weight." },
  { q: "Do you offer cash on delivery (COD)?", a: "Yes — we offer cash on delivery across Bangladesh. Orders under ৳1,000 are fully COD. Orders of ৳1,000–৳5,000 require a 50% advance. Orders over ৳5,000 require full prepayment." },
  { q: "Can I return a personalised item?", a: "Because every order is made to order, we cannot accept returns for change of mind. We do offer free reprints or refunds for printing errors and manufacturing defects." },
  { q: "What if there is a printing error or defect on my order?", a: "If your order arrives with a printing error or manufacturing defect, we will reprint or refund it at no cost. Photograph the issue and contact us within 48 hours of receiving your order." },
  { q: "What if my order was damaged during delivery?", a: "Photograph the packaging and contents before unpacking. Contact us within 48 hours with photos. We will file a claim with the courier and send a replacement at no extra charge." },
  { q: "How do I place a bulk or corporate order?", a: "For orders of 25+ pieces or corporate invoicing, contact our corporate team via email or WhatsApp with your product type, quantity, design brief, and delivery deadline. We'll send a quote within one working day." },
  { q: "Can you add our company logo to products?", a: "Yes — branded merchandise is one of our specialities. We can print your logo on t-shirts, tote bags, mugs, notebooks, rubber stamps and more. Supply your logo as a vector file for the sharpest result." },
  { q: "Do you issue official invoices for corporate orders?", a: "Yes. We issue official VAT invoices for all corporate and bulk orders. Please mention your company name, BIN if applicable, and billing address when placing your enquiry." },
];

export default function FaqPage() {
  const waHref = whatsappLink(
    siteConfig.contact.whatsapp,
    siteConfig.contact.whatsappMessage
  );

  return (
    <>
      <JsonLd data={faqLd(FAQ_ITEMS)} />
      <PageHeader
        kicker="Help centre"
        title="Frequently asked questions"
        intro="Find answers to common questions about custom orders, artwork, delivery across Bangladesh, and our policies. Can't find what you need? We're one message away."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        variant="light"
      />

      <section className="section bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            {/* Sticky group nav */}
            <nav className="hidden lg:block">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-onyx-400">
                Jump to section
              </p>
              <ul className="space-y-1">
                {faqGroups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="block rounded-lg px-3 py-2 text-[13px] font-semibold text-onyx-600 transition-colors hover:bg-onyx-100 hover:text-onyx-950"
                    >
                      {g.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* FAQ groups */}
            <div className="space-y-14">
              {faqGroups.map((group) => (
                <Reveal key={group.id}>
                  <section id={group.id} className="scroll-mt-[100px]">
                    <SectionHeading
                      kicker={group.heading}
                      title={group.heading}
                      className="mb-6"
                    />
                    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-onyx-100 sm:p-8">
                      <Accordion items={group.items} />
                    </div>
                  </section>
                </Reveal>
              ))}

              {/* CTA strip */}
              <Reveal>
                <div className="rounded-3xl bg-onyx-950 p-8 text-center">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tightest text-white mb-3">
                    Still have a question?
                  </h3>
                  <p className="text-[15px] text-white/60 mb-6 max-w-md mx-auto">
                    Our team is available Saturday through Thursday, 10:00–20:00. Most
                    WhatsApp messages get a reply within minutes during business hours.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button href="/contact" variant="primary" size="md">
                      Send us a message
                    </Button>
                    <Button href={waHref} variant="light" size="md">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp us
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
