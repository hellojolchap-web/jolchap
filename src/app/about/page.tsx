import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Stars } from "@/components/ui/Stars";
import { getTestimonials } from "@/lib/queries";
import { siteConfig } from "@/config/site";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Our Story",
  description:
    "How Jolchap grew from a small custom-stamp shop into a full print & personalisation studio in Dhaka — and the people we print for.",
  path: "/about",
});

const values = [
  {
    title: "Crafted with care",
    body: "Every order matters to us. Whether it's a single wax seal or 500 printed t-shirts, we give the same attention to detail. Nothing ships until it looks exactly right.",
  },
  {
    title: "Honest & transparent",
    body: "We send you a free design preview before you pay. No hidden fees. If there's a mistake on our side, we reprint — no arguments, no runaround.",
  },
  {
    title: "Fast turnaround",
    body: "Most standard orders are ready within 2–4 working days. We know you have deadlines — events, weddings, gifting seasons — and we respect them.",
  },
  {
    title: "Eco-conscious printing",
    body: "We use water-based inks wherever possible, source sustainable blanks, and minimise packaging waste. Looking good shouldn't cost the planet.",
  },
];

const timeline = [
  {
    year: "2019",
    event: "Founded in Dhaka",
    detail:
      "Jolchap opened its first small studio in Dhanmondi with a single laser engraver and a dream: make high-quality custom stamps and seals accessible to everyone in Bangladesh — not just big corporations.",
  },
  {
    year: "2020",
    event: "Expanded into personalised gifts",
    detail:
      "Customer demand for photo mugs, keychains and engraved frames pushed us to expand. We invested in sublimation printing equipment and launched our first personalised gifts range just before Eid.",
  },
  {
    year: "2021",
    event: "Apparel printing launched",
    detail:
      "After months of testing fabrics and inks, we launched custom t-shirt and hoodie printing. Couple tees for Valentine's Day sold out within a week — and we've never looked back.",
  },
  {
    year: "2022",
    event: "Wedding stationery & wax seals",
    detail:
      "Brides and wedding planners discovered us on Facebook. Our monogram wax seal kits became the most talked-about wedding favour of the year. We built a dedicated wedding stationery range to match.",
  },
  {
    year: "2023",
    event: "Moved to Bashundhara City",
    detail:
      "Growth meant we needed more space. We moved into our current studio at Bashundhara City Shopping Complex, Dhaka — bigger printing floor, a design consultation corner, and walk-in order collection.",
  },
  {
    year: "2024",
    event: "Corporate & bulk programme launched",
    detail:
      "Schools, startups, NGOs and event companies started coming to us for bulk branded merchandise. We formalised our corporate programme with dedicated pricing tiers and an account manager service.",
  },
  {
    year: "2026",
    event: "8,000+ happy customers — and counting",
    detail:
      "From a single engraver in 2019 to a full personalisation studio trusted by thousands. Same commitment to quality. Same free preview before you pay. Same warm team ready to help.",
  },
];

const customers = [
  {
    name: "Couples & families",
    tag: "Gifts & keepsakes",
    type: "Personal",
    bio: "From matching anniversary tees to personalised photo mugs for Eid gifts, couples and families are the heart of what we do. We love helping you turn a feeling into something you can hold.",
  },
  {
    name: "Startups & small businesses",
    tag: "Branding & merchandise",
    type: "Business",
    bio: "Custom rubber stamps, branded tote bags, printed t-shirts for your team — we help new businesses look polished from day one, with no minimum order too large to dream or too small to matter.",
  },
  {
    name: "Schools & student groups",
    tag: "Events & reunions",
    type: "Education",
    bio: "Class reunion jerseys, farewell gifts, club merchandise, school stamps — we work with student organisers and school administrations across Dhaka to make every occasion memorable.",
  },
  {
    name: "Weddings & events",
    tag: "Stationery & décor",
    type: "Events",
    bio: "Monogram wax seals, custom invitation stamps, printed favour bags and table cards — your wedding details deserve the same care as everything else. Our wedding clients often return for every occasion after.",
  },
];

export default async function AboutPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Our Story", path: "/about" },
      ])} />
      {/* ── Hero ── */}
      <PageHeader
        variant="dark"
        kicker="Est. 2019 · Dhaka"
        title="Printing stories, one order at a time."
        intro="Jolchap started as a small custom stamp studio in Dhanmondi and grew into Bangladesh's favourite personalisation studio. Every mug, tee, seal and stationery piece we make carries the same belief: your ideas deserve to exist in the real world."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* ── Origin story ── */}
      <section className="section bg-bone">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated">
                <Image
                  src="/images/about/story.webp"
                  alt="The original Jolchap studio in Dhanmondi, Dhaka — 2019"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                    The original studio · Dhanmondi, Dhaka · 2019
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <SectionHeading
                kicker="Origin story"
                title="A stamp, a dream, and a lot of tea"
                intro=""
                align="left"
              />
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-onyx-600">
                <p>
                  In 2019, our founder Rahim was frustrated by a simple problem: getting a
                  decent custom rubber stamp in Dhaka meant dealing with slow turnarounds,
                  unclear pricing, and no way to preview your design before it was already
                  cut. He set up a small laser engraver in a rented room in Dhanmondi and
                  started fixing that.
                </p>
                <p>
                  Word spread quickly — especially after he introduced free design previews
                  before payment. Small businesses, NGOs, and wedding planners found him on
                  Facebook. Orders piled up. The room became a studio. The studio needed a
                  team.
                </p>
                <p>
                  By 2021 we were printing t-shirts. By 2022 we were making wax seals for
                  weddings. By 2023 we moved into our current space at Bashundhara City.
                  What started with one engraver is now a full personalisation studio —
                  trusted by 8,000+ customers across Bangladesh.
                </p>
                <p className="font-semibold text-onyx-900">
                  The studio is bigger now. The free preview hasn't changed.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/shop" variant="primary" size="lg">
                  Browse our products
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className="section bg-onyx-950">
        <Container>
          <Reveal>
            <SectionHeading
              kicker="What we stand for"
              title="Four things we never compromise on."
              intro="These guide every order we take, every design we send, and every parcel we pack."
              align="center"
              light
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
                    <span className="font-display text-lg font-black">{i + 1}</span>
                  </span>
                  <h3 className="font-display text-base font-extrabold uppercase tracking-tightest text-white">
                    {v.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Workshop ── */}
      <section className="section bg-bone">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal delay={0.1} className="order-2 lg:order-1">
              <SectionHeading
                kicker="How we work"
                title="From your idea to your hands"
                intro=""
              />
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-onyx-600">
                <p>
                  Every Jolchap order starts with a conversation. You tell us what you want
                  — or show us a rough sketch, a phone screenshot, a reference image. Our
                  in-house design team turns that into a print-ready artwork and sends you a
                  free digital preview before we touch a single blank.
                </p>
                <p>
                  Once you approve, production begins. Depending on the product, that means
                  laser engraving, sublimation heat-press, DTF or screen printing — we
                  choose the method that gives the sharpest, most durable result for your
                  specific order.
                </p>
                <p>
                  Everything is quality-checked before packing. If something isn't sharp
                  enough, the colour isn't right, or a stamp doesn't press cleanly — we
                  redo it before you ever see it.
                </p>
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
                <Image
                  src="/images/about/workshop.webp"
                  alt="The Jolchap production studio at Bashundhara City, Dhaka"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Timeline ── */}
      <section className="section bg-onyx-950">
        <Container>
          <Reveal>
            <SectionHeading
              kicker="Our journey"
              title="Seven years in the making"
              align="center"
              light
            />
          </Reveal>
          <div className="relative mt-16">
            {/* Vertical rule */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 lg:left-1/2 lg:block" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.06}>
                  <div
                    className={`relative flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-0 ${
                      i % 2 === 0 ? "lg:justify-end" : ""
                    }`}
                  >
                    {/* Year pill — centred on line */}
                    <div className="pointer-events-none absolute left-6 top-0 hidden -translate-x-1/2 -translate-y-1 lg:left-1/2 lg:flex">
                      <span className="rounded-full bg-ember-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                        {t.year}
                      </span>
                    </div>
                    {/* Mobile year pill */}
                    <span className="lg:hidden kicker">{t.year}</span>
                    {/* Content card */}
                    <div
                      className={`w-full rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 lg:w-[45%] ${
                        i % 2 === 0 ? "lg:mr-[calc(50%+2rem)]" : "lg:ml-[calc(50%+2rem)]"
                      }`}
                    >
                      <h3 className="font-display text-base font-extrabold uppercase tracking-tightest text-white">
                        {t.event}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                        {t.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Customers we serve ── */}
      <section id="athletes" className="section bg-bone scroll-mt-[88px]">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-elevated">
                <Image
                  src="/images/about/athletes.webp"
                  alt="Jolchap customers collecting personalised orders at the Bashundhara City studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    The people we print for
                  </p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.1}>
                <SectionHeading
                  kicker="Our customers"
                  title="The people we print for"
                  intro="Jolchap customers come from every walk of life — but they all share one thing: they want something made just for them. Here's who we serve every day."
                />
              </Reveal>
              <div className="mt-8 space-y-5">
                {customers.map((a, i) => (
                  <Reveal key={a.name} delay={0.12 + i * 0.08}>
                    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-onyx-100">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-sm font-extrabold uppercase tracking-tightest text-onyx-950">
                            {a.name}
                          </h3>
                          <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-widest text-ember-600">
                            {a.tag}
                          </p>
                        </div>
                        <span className="rounded-full bg-onyx-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-onyx-500">
                          {a.type}
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-onyx-500">{a.bio}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="section bg-onyx-100/60 scroll-mt-[88px]">
        <Container>
          <Reveal>
            <SectionHeading
              kicker={`${siteConfig.name} reviews`}
              title="What our customers say"
              intro="Real feedback from people who trusted us with their orders — and came back again."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-onyx-100">
                  <Stars rating={t.rating} />
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-onyx-700">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 border-t border-onyx-100 pt-4">
                    {t.avatar && (
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-onyx-100">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-[13px] font-bold text-onyx-900">{t.name}</p>
                      <p className="text-[12px] text-onyx-400">
                        {t.role} · {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA band ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/cta.webp"
            alt="Freshly printed personalised products at the Jolchap studio"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-onyx-950/75" />
        </div>
        <Container className="relative py-24 text-center sm:py-32">
          <Reveal>
            <p className="kicker mb-4 justify-center text-ember-400">
              <span className="h-px w-7 bg-ember-400" />
              Ready to create something?
            </p>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold uppercase tracking-tightest text-white sm:text-5xl lg:text-6xl">
              Make it yours — starting today
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
              Free design preview on every order. Fast delivery across Bangladesh.
              Quality guaranteed — or we reprint, no questions asked.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/shop" variant="primary" size="lg">
                Browse all products
              </Button>
              <Button href="/contact" variant="light" size="lg">
                Talk to our team
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
