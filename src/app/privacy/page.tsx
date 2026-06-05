import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Jolchap — Custom Print & Personalisation Studio",
  description:
    "How Jolchap collects, uses and protects your personal data. Covers order processing, bKash/Nagad/card payments, courier data sharing, cookies, and your rights under Bangladesh law.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Privacy policy"
        intro="We respect your privacy and are committed to protecting your personal data. This policy explains what information we collect, why we collect it, and how you can control it."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
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
                  This Privacy Policy describes how {siteConfig.legalName} ("Jolchap",
                  "we", "us", "our"), a business registered in Bangladesh, collects,
                  uses, and shares information about you when you visit our website at{" "}
                  <a href={siteConfig.url}>{siteConfig.url}</a> (the "Site"), place an
                  order with us, or contact us. By using the Site you consent to the
                  practices described in this policy.
                </p>

                <h2>1. Information we collect</h2>

                <h3>Information you provide to us</h3>
                <ul>
                  <li>
                    <strong>Order and account data:</strong> Your name, phone number,
                    email address, delivery address, and payment method when you place an
                    order or create an account.
                  </li>
                  <li>
                    <strong>Custom artwork and design files:</strong> Any images, logos,
                    photos, or text content you upload or send to us for personalisation
                    of your order.
                  </li>
                  <li>
                    <strong>Communications:</strong> Messages you send us via the contact
                    form, email, WhatsApp, or social media — including the content of
                    your messages.
                  </li>
                  <li>
                    <strong>Marketing preferences:</strong> Your email address and consent
                    if you opt in to newsletters or promotional updates.
                  </li>
                  <li>
                    <strong>Reviews and feedback:</strong> Your display name and the
                    content of any review you submit.
                  </li>
                </ul>

                <h3>Information collected automatically</h3>
                <ul>
                  <li>
                    <strong>Log data:</strong> IP address, browser type, operating system,
                    pages visited, time on page, and referring URL when you visit our Site.
                  </li>
                  <li>
                    <strong>Device data:</strong> Device type, screen size, and language
                    settings.
                  </li>
                  <li>
                    <strong>Cookie and analytics data:</strong> See Section 4 (Cookies)
                    for full details.
                  </li>
                  <li>
                    <strong>Transaction data:</strong> Order history, products purchased,
                    payment method used (not card details), and order values.
                  </li>
                </ul>

                <h2>2. How we use your information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process, produce, and fulfil your orders, including dispatch and delivery coordination</li>
                  <li>
                    Send order confirmations, design preview approvals, dispatch
                    notifications, and delivery updates via SMS and email
                  </li>
                  <li>
                    Communicate with you about your order — including requesting artwork
                    clarification or sharing your design preview for approval
                  </li>
                  <li>
                    Respond to customer service enquiries, complaints, and support requests
                  </li>
                  <li>
                    Send marketing communications (offers, new product updates, seasonal
                    promotions) where you have opted in — you can unsubscribe at any time
                  </li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>
                    Improve our website, products, and customer service through anonymised
                    usage analysis
                  </li>
                  <li>Comply with our legal obligations under Bangladeshi law</li>
                </ul>
                <p>
                  We do not sell, rent, or share your personal data with third parties
                  for their own marketing or commercial purposes.
                </p>

                <h2>3. Third-party service providers</h2>
                <p>
                  We share personal data with trusted third-party providers only where
                  necessary to deliver our services. Each provider is bound by
                  confidentiality obligations.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Purpose</th>
                      <th>Data shared</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>bKash / Nagad</td>
                      <td>Mobile payment processing</td>
                      <td>Phone number, transaction amount</td>
                    </tr>
                    <tr>
                      <td>Card payment gateway (SSL Commerz / ShurjoPay)</td>
                      <td>Card payment processing</td>
                      <td>Billing name, card details (processed by gateway — not stored by us)</td>
                    </tr>
                    <tr>
                      <td>Pathao Courier</td>
                      <td>Delivery within Dhaka</td>
                      <td>Recipient name, phone number, delivery address</td>
                    </tr>
                    <tr>
                      <td>Sundarban Courier Service</td>
                      <td>Nationwide delivery</td>
                      <td>Recipient name, phone number, delivery address</td>
                    </tr>
                    <tr>
                      <td>RedX</td>
                      <td>Nationwide express delivery</td>
                      <td>Recipient name, phone number, delivery address</td>
                    </tr>
                    <tr>
                      <td>Vercel</td>
                      <td>Website hosting and delivery</td>
                      <td>IP address, request logs</td>
                    </tr>
                    <tr>
                      <td>Supabase</td>
                      <td>Database and user authentication</td>
                      <td>Account and order data</td>
                    </tr>
                    <tr>
                      <td>Google Analytics 4</td>
                      <td>Website analytics</td>
                      <td>Anonymised usage data, cookies</td>
                    </tr>
                    <tr>
                      <td>Meta (Facebook/Instagram)</td>
                      <td>Social media marketing measurement</td>
                      <td>Hashed email, page visits, purchase events (where consented)</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  Card and mobile payment details are processed directly by our payment
                  gateway partners (bKash, Nagad, SSL Commerz / ShurjoPay) and are
                  never stored on our servers. We do not have access to your full card
                  number or mobile banking PIN.
                </p>

                <h2>4. Cookies</h2>
                <p>
                  Our Site uses cookies — small text files stored on your device — to
                  enable core features, analyse traffic, and understand how visitors use
                  the Site. We use the following types:
                </p>
                <ul>
                  <li>
                    <strong>Essential cookies:</strong> Required for the Site to work —
                    session management, shopping cart, and security. Cannot be disabled.
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Set by Google Analytics to collect
                    anonymised data about page visits and usage patterns. IP addresses are
                    anonymised before storage.
                  </li>
                  <li>
                    <strong>Marketing cookies:</strong> Set by Meta Pixel to measure
                    advertising performance and, where consented, show relevant Jolchap
                    promotions on Facebook and Instagram.
                  </li>
                  <li>
                    <strong>Preference cookies:</strong> Remember your language,
                    notification dismissals, and similar interface preferences.
                  </li>
                </ul>
                <p>
                  You can manage cookie preferences via your browser settings. Disabling
                  essential cookies may prevent the Site from functioning correctly.
                </p>

                <h2>5. Artwork and design files</h2>
                <p>
                  Any photos, logos, text content, or design files you upload or send
                  to us for your custom order are used solely to produce that order.
                  We do not use your artwork for any other commercial purpose. Files
                  are stored securely and deleted after a reasonable period following
                  order completion, unless you have given us explicit permission to
                  retain them for repeat orders.
                </p>
                <p>
                  By submitting artwork or images for printing, you confirm that you
                  own or have the right to reproduce that content. See our{" "}
                  <a href="/terms">Terms of Service</a> for full details on intellectual
                  property responsibilities.
                </p>

                <h2>6. Data retention</h2>
                <ul>
                  <li>
                    <strong>Order data:</strong> Retained for 7 years from the date of
                    purchase, as required by Bangladesh tax and business record regulations.
                  </li>
                  <li>
                    <strong>Account data:</strong> Retained until you request deletion,
                    plus 90 days to resolve outstanding matters.
                  </li>
                  <li>
                    <strong>Marketing preferences:</strong> Until you unsubscribe.
                    Removed from marketing lists within 10 working days of opt-out.
                  </li>
                  <li>
                    <strong>Analytics data:</strong> 26 months, as per Google Analytics
                    default settings.
                  </li>
                </ul>

                <h2>7. Your rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>
                    <strong>Access:</strong> Request a copy of the personal data we hold
                    about you.
                  </li>
                  <li>
                    <strong>Correction:</strong> Ask us to correct inaccurate or incomplete
                    data.
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal data,
                    subject to legal retention requirements.
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing for direct marketing
                    purposes at any time.
                  </li>
                  <li>
                    <strong>Portability:</strong> Receive a copy of your data in a
                    machine-readable format where technically feasible.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, email us at{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  . We will respond within 15 working days.
                </p>

                <h2>8. Data security</h2>
                <p>
                  We use industry-standard technical and organisational measures to
                  protect your data — including TLS encryption for data in transit,
                  encrypted database storage, and restricted staff access controls. No
                  internet transmission is 100% secure, but we take all reasonable steps
                  to protect your information. In the event of a security incident that
                  materially affects your data, we will notify you promptly.
                </p>

                <h2>9. Children's privacy</h2>
                <p>
                  Our Site is not directed at children under the age of 13. We do not
                  knowingly collect personal information from children. If you believe
                  we have inadvertently collected information from a child, please
                  contact us immediately.
                </p>

                <h2>10. Links to third-party sites</h2>
                <p>
                  Our Site may contain links to third-party websites (for example,
                  courier tracking pages or social media platforms). This Privacy Policy
                  does not apply to those sites, and we are not responsible for their
                  privacy practices.
                </p>

                <h2>11. Changes to this policy</h2>
                <p>
                  We may update this policy from time to time to reflect changes in our
                  practices or applicable law. We will post the revised policy on this
                  page with an updated "Last updated" date. Significant changes will be
                  communicated to registered customers by email.
                </p>

                <h2>12. Contact</h2>
                <p>
                  For privacy-related enquiries or to exercise your rights, contact us at:
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
