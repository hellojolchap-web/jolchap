import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Returns & Refund Policy | Jolchap — Custom Print & Personalisation Studio",
  description:
    "Jolchap returns and refund policy for personalised, custom-made and made-to-order products. Free reprints or full refunds for printing errors and defects.",
};

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        kicker="Returns & refunds"
        title="We stand behind every order"
        intro="All our products are custom-made for you. We can't accept returns for change of mind — but if there's a printing error or defect on our side, we'll reprint or refund it, no questions asked."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Support", href: "/contact" },
          { label: "Returns & Refunds" },
        ]}
        variant="light"
      />

      <section className="section bg-bone">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              {/* Trust signals */}
              <div className="mb-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    heading: "Free reprint",
                    body: "Printing errors and defects get a free reprint dispatched within 2–3 working days.",
                  },
                  {
                    heading: "Full refund option",
                    body: "Prefer a refund instead of a reprint? We'll process it to your original payment method.",
                  },
                  {
                    heading: "Report within 48 hours",
                    body: "Photograph the issue and contact us within 48 hours of receiving your order.",
                  },
                ].map((t) => (
                  <div
                    key={t.heading}
                    className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-onyx-100"
                  >
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-tightest text-ember-600 mb-1">
                      {t.heading}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-onyx-500">{t.body}</p>
                  </div>
                ))}
              </div>

              <div className="prose prose-jolchap max-w-none">
                <p className="lead">
                  Last updated: <strong>1 May 2026</strong>. This policy applies to all
                  purchases made on{" "}
                  <a href={siteConfig.url}>{siteConfig.url}</a>.
                </p>

                <h2>Made-to-order policy</h2>
                <p>
                  Every product sold by {siteConfig.legalName} is personalised and
                  made to order specifically for the individual customer. This means each
                  item is produced only after you place your order and approve a design
                  preview. Because these items cannot be restocked or resold, we are{" "}
                  <strong>unable to accept returns or offer refunds for change of mind</strong>,
                  incorrect size selection, or any other reason not related to a fault
                  on our side.
                </p>
                <p>
                  Please review your design preview carefully before approving production.
                  Check all spelling, names, dates, and design elements. Once you approve
                  and production begins, we cannot make changes.
                </p>

                <h2>When we will reprint or refund</h2>
                <p>
                  We take full responsibility for any error or defect caused on our side.
                  You are entitled to a free reprint or a full refund if:
                </p>
                <ul>
                  <li>
                    <strong>Printing error:</strong> The printed product does not match
                    the approved design preview — wrong text, missing elements, incorrect
                    colours (significantly different from the approved mockup), or
                    misaligned print.
                  </li>
                  <li>
                    <strong>Manufacturing defect:</strong> The product has a structural
                    defect — cracked mug, torn seam, broken keychain ring, faded print
                    on a new item, or any damage that was present before delivery.
                  </li>
                  <li>
                    <strong>Wrong item shipped:</strong> You received a different product
                    or a different personalisation than what you ordered.
                  </li>
                  <li>
                    <strong>Damage in transit:</strong> The item was damaged during
                    courier delivery (visible damage to packaging and contents upon
                    arrival).
                  </li>
                </ul>

                <h2>How to report an issue</h2>
                <ol>
                  <li>
                    Contact us within <strong>48 hours</strong> of receiving your order.
                    Reports made after 48 hours may not be eligible for a remedy at our
                    discretion, unless the defect could not reasonably have been identified
                    immediately upon receipt.
                  </li>
                  <li>
                    Send your <strong>order number</strong> and clear photographs of the
                    issue — showing the defect, the full product, and the packaging if
                    there is delivery damage.
                  </li>
                  <li>
                    Reach us by WhatsApp at{" "}
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                      {siteConfig.contact.phone}
                    </a>{" "}
                    or email{" "}
                    <a href={`mailto:${siteConfig.contact.email}?subject=Order%20Issue`}>
                      {siteConfig.contact.email}
                    </a>
                    . WhatsApp is the fastest option.
                  </li>
                  <li>
                    We will assess your report within 1 working day and confirm whether
                    a reprint or refund is approved.
                  </li>
                </ol>

                <h2>Reprint process</h2>
                <p>
                  If a reprint is approved, we will reproduce your order and dispatch it
                  within 2–3 working days of approval (subject to production schedule).
                  Delivery is at no cost to you. You do not need to return the original
                  defective item unless we specifically request it for quality review
                  purposes.
                </p>

                <h2>Refund process</h2>
                <p>
                  If you prefer a refund instead of a reprint, or if a reprint is not
                  feasible, we will issue a full refund of the order value (excluding
                  original delivery charges, unless the delivery itself was the issue).
                </p>
                <p>
                  Refunds are processed to your original payment method within{" "}
                  <strong>5 working days</strong> of approval:
                </p>
                <ul>
                  <li>
                    <strong>bKash / Nagad:</strong> Refunds are sent to the original
                    mobile number used for payment. You will receive an SMS confirmation.
                  </li>
                  <li>
                    <strong>Card payments:</strong> Refunds are sent to the original card.
                    Your bank may take 5–10 working days to reflect the credit on your
                    statement.
                  </li>
                  <li>
                    <strong>Bank transfer:</strong> Refunds are processed to the account
                    details you provide. Please allow 3–5 working days.
                  </li>
                </ul>

                <h2>What is not covered</h2>
                <p>
                  The following are <strong>not eligible</strong> for a return, reprint,
                  or refund:
                </p>
                <ul>
                  <li>
                    Change of mind, no longer needing the item, or ordering the wrong
                    quantity — as all items are produced specifically for your order.
                  </li>
                  <li>
                    Spelling mistakes, incorrect names, or design errors that were present
                    in the design you approved in the preview. Please check everything
                    carefully before approving.
                  </li>
                  <li>
                    Slight colour variation between the on-screen preview and the printed
                    product — a small difference is inherent in the transition from
                    screen (RGB) to print (CMYK) and is not considered a defect.
                  </li>
                  <li>
                    Damage caused by improper care after delivery — machine washing items
                    labelled hand-wash only, using harsh chemicals, or exposing products
                    to conditions they were not designed for.
                  </li>
                  <li>
                    Orders where the customer supplied low-resolution artwork despite being
                    warned by our team that the print quality may be affected.
                  </li>
                </ul>

                <h2>Apparel size issues</h2>
                <p>
                  Because all apparel is printed to order, we cannot exchange sizes after
                  production. Please consult our{" "}
                  <a href="/size-guide">Apparel Size Chart</a> carefully before ordering.
                  If you are unsure of your size, contact us on WhatsApp before placing
                  your order — we are happy to advise. We are not responsible for size
                  selection errors made by the customer.
                </p>

                <h2>Contact</h2>
                <p>
                  For returns, refund, or quality queries, contact our team at{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>{" "}
                  or call / WhatsApp{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    {siteConfig.contact.phone}
                  </a>{" "}
                  during business hours ({siteConfig.contact.hours}).
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="md">
                  Report an issue
                </Button>
                <Button href="/shipping" variant="outline" size="md">
                  Delivery policy
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
