import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | Jolchap — Custom Print & Personalisation Studio",
  description:
    "Terms governing your use of the Jolchap website and purchase of custom-printed products — ordering, custom artwork IP, pricing in BDT, payments, delivery, and returns.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Terms of service"
        intro="Please read these terms carefully. By using the Jolchap website or placing an order, you agree to be bound by them."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
        variant="light"
      />

      <section className="section bg-bone">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-jolchap max-w-none">
                <p className="lead">
                  Last updated: <strong>1 May 2026</strong>
                </p>
                <p>
                  These Terms of Service ("Terms") constitute a legally binding agreement
                  between you ("you", "your", "customer") and {siteConfig.legalName}{" "}
                  ("Jolchap", "we", "us", "our"), a business registered in Bangladesh,
                  governing your access to and use of{" "}
                  <a href={siteConfig.url}>{siteConfig.url}</a> (the "Site") and any
                  purchases you make through it.
                </p>
                <p>
                  By accessing the Site or placing an order, you confirm that you are at
                  least 18 years of age (or of legal contracting age in Bangladesh), have
                  read and understood these Terms, and agree to be bound by them. If you
                  do not agree, please do not use the Site.
                </p>

                <h2>1. Use of the Site</h2>

                <h3>1.1 Permitted use</h3>
                <p>
                  You may use the Site for lawful personal and commercial purposes. You
                  agree not to:
                </p>
                <ul>
                  <li>
                    Use the Site in a way that damages, overburdens, or impairs its
                    operation or interferes with other users
                  </li>
                  <li>
                    Attempt unauthorised access to any part of the Site, its servers, or
                    connected systems
                  </li>
                  <li>
                    Scrape or extract data from the Site by automated means without our
                    prior written consent
                  </li>
                  <li>
                    Use the Site to transmit unsolicited communications or malicious code
                  </li>
                  <li>
                    Misrepresent your identity or upload artwork you do not have the right
                    to use (see Section 5)
                  </li>
                </ul>

                <h3>1.2 Account registration</h3>
                <p>
                  You may browse and order as a guest. If you create an account, you are
                  responsible for keeping your login credentials confidential and for all
                  activity under your account. Notify us immediately of any unauthorised
                  access at{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  . We reserve the right to suspend or terminate accounts that breach
                  these Terms.
                </p>

                <h2>2. Orders and contract formation</h2>

                <h3>2.1 The order process</h3>
                <p>
                  When you submit an order through our checkout, you are making an offer
                  to purchase the specified products at the stated prices. An order
                  confirmation message does not constitute our acceptance — your order
                  is accepted, and a binding contract formed, when we send your design
                  preview for approval and you confirm it, or when we dispatch the goods
                  and send a dispatch notification.
                </p>
                <p>
                  Because all products are custom-made, your order enters production only
                  after you approve the design preview. By approving the preview, you
                  confirm that all text, names, dates, and design elements are correct
                  and authorise us to proceed with production.
                </p>
                <p>
                  We reserve the right to decline any order at our sole discretion,
                  including cases where a product is unavailable, a pricing error has
                  occurred, or we have reasonable grounds to suspect fraudulent activity.
                  In such cases we will provide a full refund of any amount paid.
                </p>

                <h3>2.2 Pricing</h3>
                <p>
                  All prices are displayed in Bangladeshi Taka (BDT / ৳). Prices are
                  inclusive of any applicable taxes unless otherwise stated. Delivery
                  charges are shown separately at checkout.
                </p>
                <p>
                  We make every effort to ensure prices on the Site are accurate. In the
                  event of a pricing error, we will contact you to offer the option to
                  continue at the correct price or cancel for a full refund. We are not
                  obligated to honour orders placed at an incorrectly stated price.
                </p>
                <p>
                  Prices are subject to change without notice. Price changes will not
                  affect orders already accepted and in production.
                </p>

                <h3>2.3 Payment</h3>
                <p>
                  We accept the following payment methods:
                </p>
                <ul>
                  <li><strong>Mobile banking:</strong> bKash, Nagad</li>
                  <li><strong>Debit / credit cards:</strong> Visa, Mastercard (via SSL Commerz or ShurjoPay)</li>
                  <li><strong>Cash on delivery (COD):</strong> Available for eligible orders — see our <a href="/shipping">Delivery Policy</a> for COD terms and advance payment requirements</li>
                  <li><strong>Bank transfer:</strong> Available for corporate and bulk orders on request</li>
                </ul>
                <p>
                  Payment is taken in full (or the applicable advance amount for COD
                  orders) at the time of order. Card and mobile payment details are
                  processed by our gateway partners and are never stored on our servers.
                </p>

                <h3>2.4 Product availability</h3>
                <p>
                  If a product or material becomes unavailable after your order is placed,
                  we will contact you to offer a suitable alternative, an extended
                  production timeline, or a full refund.
                </p>

                <h2>3. Custom artwork and your responsibilities</h2>

                <h3>3.1 Your responsibility for uploaded content</h3>
                <p>
                  By uploading, sending, or referencing any image, logo, photograph, text,
                  or other content for printing ("Customer Content"), you represent and
                  warrant that:
                </p>
                <ul>
                  <li>
                    You own the Customer Content or have obtained all necessary rights,
                    licences, and permissions to reproduce it in the form requested.
                  </li>
                  <li>
                    The Customer Content does not infringe any third-party intellectual
                    property rights, including copyright, trademark, or registered design.
                  </li>
                  <li>
                    The Customer Content does not contain defamatory, obscene, unlawful,
                    or otherwise objectionable material.
                  </li>
                  <li>
                    You have obtained any necessary consent from individuals whose
                    photographs or personal data appear in the Customer Content.
                  </li>
                </ul>
                <p>
                  You indemnify {siteConfig.legalName} against any third-party claims,
                  losses, or expenses arising from Customer Content that breaches these
                  warranties. We reserve the right to refuse production of any Customer
                  Content that we reasonably believe infringes third-party rights or
                  violates applicable law.
                </p>

                <h3>3.2 Design preview approval</h3>
                <p>
                  Before production begins, we send you a digital design preview of your
                  order for approval. You must review this carefully — checking all
                  spelling, names, dates, layout, and colours. Once you approve the
                  preview, you accept responsibility for the content as shown. Changes
                  requested after approval may not be possible and may incur additional
                  charges.
                </p>

                <h3>3.3 Jolchap's intellectual property</h3>
                <p>
                  All original designs, artwork, templates, and materials created by
                  Jolchap remain our intellectual property. Purchasing a printed product
                  does not transfer ownership of any design created by our team.
                </p>

                <h2>4. Delivery and risk</h2>
                <p>
                  Delivery terms, timelines, courier partners, rates, and cash-on-delivery
                  conditions are set out in our{" "}
                  <a href="/shipping">Delivery Policy</a>, which forms part of these Terms.
                  Risk of loss passes to you when the parcel is collected by the courier.
                </p>

                <h2>5. Returns and refunds</h2>
                <p>
                  Our{" "}
                  <a href="/returns">Returns &amp; Refund Policy</a> forms part of these
                  Terms. Because all products are personalised and made to order, returns
                  for change of mind are not accepted. We do offer free reprints or refunds
                  for printing errors and manufacturing defects — see the Returns Policy
                  for full details and the process for reporting issues.
                </p>

                <h2>6. Intellectual property — Site content</h2>
                <p>
                  All content on the Site — including text, images, graphics, the Jolchap
                  name and logo, product designs, and layout — is the property of{" "}
                  {siteConfig.legalName} or its licensors and is protected under
                  applicable intellectual property law. You may not reproduce, distribute,
                  or commercially exploit any Site content without our prior written
                  consent, except for normal browser caching and personal, non-commercial
                  use.
                </p>

                <h2>7. Disclaimer of warranties</h2>
                <p>
                  The Site and its content are provided "as is" without warranties of
                  any kind, express or implied. We do not warrant that the Site will be
                  uninterrupted, error-free, or free of viruses or harmful components.
                  We make no warranty regarding the accuracy or completeness of any
                  content on the Site. Product quality warranties are as described in
                  our Returns &amp; Refund Policy.
                </p>

                <h2>8. Limitation of liability</h2>
                <p>
                  To the fullest extent permitted by applicable Bangladeshi law,{" "}
                  {siteConfig.legalName} and its employees, agents, and service providers
                  shall not be liable for any indirect, incidental, special, or
                  consequential loss or damage arising from your use of the Site or
                  purchase of our products.
                </p>
                <p>
                  Our total liability to you for any claim arising under or in connection
                  with these Terms shall not exceed the total amount paid by you for the
                  specific order giving rise to the claim.
                </p>
                <p>
                  Nothing in these Terms limits our liability for fraud or any liability
                  that cannot be excluded under applicable consumer protection law.
                </p>

                <h2>9. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless {siteConfig.legalName}, its
                  employees, and agents from and against any claims, liabilities, damages,
                  and expenses (including reasonable legal costs) arising from your
                  violation of these Terms, your Customer Content, or your misuse of the
                  Site.
                </p>

                <h2>10. Governing law and disputes</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws
                  of the People's Republic of Bangladesh. Any dispute arising out of or
                  relating to these Terms or your use of the Site shall be subject to
                  the exclusive jurisdiction of the courts of Dhaka, Bangladesh.
                </p>
                <p>
                  Before initiating formal legal proceedings, you agree to contact us at{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>{" "}
                  and allow 15 working days for us to attempt to resolve the matter
                  informally.
                </p>

                <h2>11. Changes to these Terms</h2>
                <p>
                  We reserve the right to update these Terms at any time by posting the
                  revised version on this page with an updated "Last updated" date.
                  Continued use of the Site after changes are posted constitutes your
                  acceptance of the revised Terms. For significant changes, registered
                  customers will be notified by email.
                </p>

                <h2>12. Entire agreement and severability</h2>
                <p>
                  These Terms, together with our Privacy Policy, Delivery Policy, and
                  Returns &amp; Refund Policy, constitute the entire agreement between
                  you and {siteConfig.legalName} regarding your use of the Site.
                  If any provision is found to be unenforceable, the remaining provisions
                  shall continue in full force and effect.
                </p>

                <h2>13. Contact</h2>
                <p>
                  Questions about these Terms should be directed to:
                </p>
                <p>
                  {siteConfig.legalName}<br />
                  {siteConfig.contact.address.line1}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{" "}
                  {siteConfig.contact.address.postcode}<br />
                  {siteConfig.contact.address.country}<br />
                  Email:{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  <br />
                  Phone:{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
