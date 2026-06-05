import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Youtube, Facebook } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us | Jolchap — Custom Print & Personalisation Studio",
  description:
    "Get in touch with the Jolchap team for custom order quotes, corporate & bulk enquiries, order tracking, or general help. We reply within one business day.",
};

const { contact, socials } = siteConfig;

const socialLinks = [
  { label: "Instagram", href: socials.instagram, Icon: Instagram },
  { label: "YouTube", href: socials.youtube, Icon: Youtube },
  { label: "Facebook", href: socials.facebook, Icon: Facebook },
];

export default function ContactPage() {
  const waHref = whatsappLink(contact.whatsapp, contact.whatsappMessage);

  return (
    <>
      <PageHeader
        kicker="Get in touch"
        title="We're here to help"
        intro="Questions about a custom order, need a bulk quote, or want to track your delivery? Our team is available Saturday through Thursday and we typically reply within a few hours."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        variant="light"
      />

      {/* ── Main 2-col section ── */}
      <section className="section bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
            {/* Left — form */}
            <Reveal>
              <ContactForm />
            </Reveal>

            {/* Right — contact details */}
            <div className="flex flex-col gap-8">
              {/* WhatsApp CTA */}
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-onyx-950 p-7 text-white ring-1 ring-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </span>
                    <h3 className="font-display text-base font-extrabold uppercase tracking-tightest text-white">
                      Chat on WhatsApp
                    </h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-white/60 mb-5">
                    The fastest way to get a custom quote, share your artwork, or ask about
                    your order. Send us a message on WhatsApp — we usually reply within
                    minutes during business hours.
                  </p>
                  <Button href={waHref} variant="light" size="md" className="w-full">
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp
                  </Button>
                </div>
              </Reveal>

              {/* Contact details */}
              <Reveal delay={0.15}>
                <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-onyx-100">
                  <h3 className="font-display text-base font-extrabold uppercase tracking-tightest text-onyx-950 mb-5">
                    Contact details
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-ember-500" strokeWidth={1.5} />
                      <div className="text-[14px] text-onyx-600 leading-relaxed">
                        {contact.address.line1}<br />
                        {contact.address.city}, {contact.address.region} {contact.address.postcode}<br />
                        {contact.address.country}
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="h-5 w-5 flex-shrink-0 text-ember-500" strokeWidth={1.5} />
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                        className="text-[14px] font-semibold text-onyx-900 hover:text-ember-600 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5 flex-shrink-0 text-ember-500" strokeWidth={1.5} />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-[14px] font-semibold text-onyx-900 hover:text-ember-600 transition-colors break-all"
                      >
                        {contact.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-ember-500" strokeWidth={1.5} />
                      <span className="text-[14px] text-onyx-600">{contact.hours}</span>
                    </li>
                  </ul>

                  <div className="mt-6 flex items-center gap-3 border-t border-onyx-100 pt-5">
                    {socialLinks.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-onyx-100 text-onyx-500 transition-colors hover:bg-ember-500 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                    <span className="ml-1 text-[12px] text-onyx-400">Follow Jolchap</span>
                  </div>
                </div>
              </Reveal>

              {/* CSS-only map panel */}
              <Reveal delay={0.2}>
                <div className="relative overflow-hidden rounded-3xl bg-onyx-950 ring-1 ring-onyx-800" style={{ height: 180 }}>
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  {/* Simulated streets */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-0 right-0 top-1/3 h-px bg-onyx-400" />
                    <div className="absolute left-0 right-0 top-2/3 h-px bg-onyx-400" />
                    <div className="absolute bottom-0 top-0 left-1/4 w-px bg-onyx-400" />
                    <div className="absolute bottom-0 top-0 left-1/2 w-px bg-onyx-400" />
                    <div className="absolute bottom-0 top-0 left-3/4 w-px bg-onyx-400" />
                  </div>
                  {/* Pin */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember-500 shadow-glow-sm">
                      <MapPin className="h-4 w-4 text-white" strokeWidth={2} />
                    </span>
                    <span className="mt-1 h-2 w-px bg-ember-500 opacity-60" />
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-3 left-4 right-4 text-center">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/60">
                      Bashundhara City, Dhaka
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Order tracking ── */}
      <section id="track" className="section scroll-mt-[88px] bg-onyx-100/60">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <SectionHeading
                kicker="Track your order"
                title="Where is my order?"
                intro="Once your order is dispatched, you'll receive an SMS and email with your courier tracking number. You can track your parcel directly on the courier's website — we partner with Pathao, Sundarban, and RedX for deliveries across Bangladesh."
                align="center"
              />
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-card ring-1 ring-onyx-100 text-left text-[14px] leading-relaxed text-onyx-600 space-y-2">
                <p><span className="font-semibold text-onyx-900">Didn't receive a dispatch notification?</span> Check your spam/junk folder first, then use the contact form above (select <em>General enquiry</em>) with your order number and we'll resend the tracking details immediately.</p>
                <p><span className="font-semibold text-onyx-900">Order number format:</span> JC-XXXXXX — found in your original order confirmation message and in your account order history.</p>
                <p><span className="font-semibold text-onyx-900">Production time:</span> Most orders take 2–4 working days to produce before dispatch. If your production time has passed and you haven't received a dispatch notification, please get in touch.</p>
              </div>
              <div className="mt-6">
                <Button href={whatsappLink(contact.whatsapp, "Hi Jolchap — I'd like to track my order. My order number is:")} variant="outline" size="md">
                  Track via WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Wholesale / Corporate ── */}
      <section id="wholesale" className="section scroll-mt-[88px] bg-onyx-950">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <SectionHeading
                kicker="Businesses & organisations"
                title="Corporate & bulk orders"
                intro="Equip your team, brand your office, or prepare merchandise for your next event. Jolchap handles bulk custom print orders for companies, NGOs, schools and event teams across Bangladesh — with dedicated pricing and a single point of contact."
                align="center"
                light
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { heading: "Volume discounts", body: "Better unit prices from 25 pieces upward. Mix products across an order to qualify — e.g. 20 tees + 10 mugs gets bulk pricing." },
                  { heading: "Branded packaging", body: "Add your logo to boxes, bags, tissue paper or stickers for a polished unboxing experience your recipients will remember." },
                  { heading: "Dedicated account manager", body: "One person handles your quote, design approval, production updates and delivery — no chasing multiple departments." },
                ].map((item) => (
                  <div key={item.heading} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 text-left">
                    <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-white mb-2">{item.heading}</h4>
                    <p className="text-[13px] leading-relaxed text-white/55">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href={`mailto:${contact.email}?subject=Corporate%20%26%20Bulk%20Order%20Enquiry`}
                  variant="primary"
                  size="lg"
                >
                  <Mail className="h-4 w-4" />
                  Email our team
                </Button>
                <Button href={waHref} variant="light" size="lg">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Reseller programme ── */}
      <section id="affiliate" className="section scroll-mt-[88px] bg-bone">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <SectionHeading
                kicker="Earn with Jolchap"
                title="Reseller programme"
                intro="Are you a gift shop owner, event planner, stationery boutique, or online seller? Partner with Jolchap as a reseller — we handle production, you handle sales and earn a margin on every order you bring us."
                align="center"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { heading: "Attractive margins", body: "Resellers earn a competitive margin on every order fulfilled. Margins scale with monthly volume — the more you sell, the better your rates." },
                  { heading: "No stock, no risk", body: "You take orders from your customers, pass them to us, and we produce and ship. You never need to hold inventory or manage production." },
                  { heading: "Your branding, our production", body: "Orders can go out under your brand name with your packaging inserts. Your customers see your brand; we stay behind the scenes." },
                  { heading: "Dedicated reseller portal", body: "Submit and track orders, download invoices, and view production status — all through a private reseller dashboard." },
                ].map((item) => (
                  <div key={item.heading} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-onyx-100 text-left">
                    <h4 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950 mb-2">{item.heading}</h4>
                    <p className="text-[13px] leading-relaxed text-onyx-500">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  href={`mailto:${contact.email}?subject=Reseller%20Programme%20Application`}
                  variant="primary"
                  size="lg"
                >
                  Apply to become a reseller
                </Button>
              </div>
              <p className="mt-4 text-[13px] text-onyx-400">
                Applications are reviewed within 3 working days. We welcome resellers from across Bangladesh.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
