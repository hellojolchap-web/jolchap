import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Delivery & Shipping Policy | Jolchap — Custom Print & Personalisation Studio",
  description:
    "Jolchap delivery rates for Dhaka and nationwide Bangladesh, production turnaround times, courier partners (Pathao, Sundarban, RedX), cash on delivery, and order tracking.",
};

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        kicker="Delivery & shipping"
        title="How and when your order arrives"
        intro="We deliver across Bangladesh via trusted courier partners. Production happens first — then your order ships. Here's everything you need to know."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Support", href: "/contact" },
          { label: "Delivery Policy" },
        ]}
        variant="light"
      />

      <section className="section bg-bone">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-jolchap max-w-none">
                <p className="lead">
                  Last updated: <strong>1 May 2026</strong>. This policy applies to all
                  orders placed through{" "}
                  <a href={siteConfig.url}>{siteConfig.url}</a>. The version in effect at
                  the time of your order applies.
                </p>

                <h2>How our process works</h2>
                <p>
                  Unlike standard e-commerce orders, every Jolchap product is made to
                  order. This means there are two stages before your order reaches you:
                </p>
                <ol>
                  <li>
                    <strong>Production time</strong> — the time it takes us to design,
                    approve and print/produce your item after you place your order and
                    approve your design preview.
                  </li>
                  <li>
                    <strong>Delivery time</strong> — the time your parcel spends with the
                    courier after we dispatch it.
                  </li>
                </ol>
                <p>
                  Your <strong>total estimated wait</strong> is production time plus
                  delivery time. Both are shown at checkout and confirmed in your order
                  confirmation message.
                </p>

                <h2>Production times</h2>
                <p>
                  Production begins after you approve your free design preview. Typical
                  production timelines (working days):
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Product type</th>
                      <th>Standard production</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rubber stamps &amp; seals</td>
                      <td>1–2 working days</td>
                    </tr>
                    <tr>
                      <td>Photo mugs, keychains, small gifts</td>
                      <td>1–2 working days</td>
                    </tr>
                    <tr>
                      <td>T-shirts &amp; apparel (1–10 pieces)</td>
                      <td>2–3 working days</td>
                    </tr>
                    <tr>
                      <td>Bulk apparel (10+ pieces)</td>
                      <td>3–5 working days</td>
                    </tr>
                    <tr>
                      <td>Wedding stationery &amp; business cards</td>
                      <td>2–4 working days</td>
                    </tr>
                    <tr>
                      <td>Tote bags &amp; canvas products</td>
                      <td>2–3 working days</td>
                    </tr>
                    <tr>
                      <td>Corporate &amp; bulk orders (25+ pieces)</td>
                      <td>4–7 working days</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  During peak periods — Eid ul-Fitr, Eid ul-Adha, Valentine's Day,
                  graduation season — production times may be extended by 1–3 working days.
                  Any active delays will be communicated via the site and your order
                  confirmation.
                </p>

                <h2>Delivery rates &amp; timelines</h2>
                <p>
                  Delivery charges are calculated at checkout based on your location and
                  parcel weight. Estimated delivery times below are measured from dispatch
                  date (after production):
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Delivery zone</th>
                      <th>Estimated delivery</th>
                      <th>Standard charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dhaka city</td>
                      <td>Same day – next day</td>
                      <td>৳60–৳80</td>
                    </tr>
                    <tr>
                      <td>Dhaka district (outside city)</td>
                      <td>1–2 working days</td>
                      <td>৳80–৳100</td>
                    </tr>
                    <tr>
                      <td>Chittagong, Sylhet, Rajshahi, Khulna, Cumilla</td>
                      <td>2–3 working days</td>
                      <td>৳120–৳140</td>
                    </tr>
                    <tr>
                      <td>Other divisional cities</td>
                      <td>2–4 working days</td>
                      <td>৳130–৳150</td>
                    </tr>
                    <tr>
                      <td>Remote upazilas &amp; sub-districts</td>
                      <td>3–5 working days</td>
                      <td>৳150–৳180</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  Charges are indicative. The exact charge is confirmed at checkout.
                  {siteConfig.legalName} is not liable for delivery delays caused by
                  courier disruptions, adverse weather, or address errors.
                </p>

                <h2>Courier partners</h2>
                <p>
                  We dispatch orders through the following couriers depending on your
                  location and the size of your parcel:
                </p>
                <ul>
                  <li>
                    <strong>Pathao Courier</strong> — Dhaka city and selected Dhaka
                    district areas. Fast and reliable for same-day and next-day delivery.
                  </li>
                  <li>
                    <strong>Sundarban Courier Service</strong> — Nationwide delivery to
                    all 64 districts. Our preferred partner for outside-Dhaka orders,
                    especially for heavier or fragile parcels.
                  </li>
                  <li>
                    <strong>RedX</strong> — Nationwide express delivery. Used for
                    time-sensitive orders and areas where Sundarban coverage is limited.
                  </li>
                </ul>
                <p>
                  You will receive an SMS and email notification with your courier name
                  and tracking number when your order is dispatched.
                </p>

                <h2>Cash on delivery (COD)</h2>
                <p>
                  We offer cash on delivery for eligible orders across Bangladesh. Because
                  all our products are custom-made, the following COD terms apply:
                </p>
                <ul>
                  <li>
                    Orders under ৳1,000: full COD available — pay the courier on delivery.
                  </li>
                  <li>
                    Orders of ৳1,000–৳5,000: a 50% advance payment (via bKash, Nagad, or
                    bank transfer) is required before production begins. The remaining 50%
                    is paid to the courier.
                  </li>
                  <li>
                    Orders over ৳5,000: full prepayment is required.
                  </li>
                  <li>
                    Rush orders and wedding stationery: full prepayment regardless of order
                    value.
                  </li>
                </ul>
                <p>
                  COD availability is confirmed at checkout. If COD is not available for
                  your order, you will be prompted to pay in advance via bKash, Nagad, or
                  card.
                </p>

                <h2>Order tracking</h2>
                <p>
                  Once your order is dispatched, a tracking number is sent to your phone
                  (SMS) and email. You can track your parcel on the courier's website:
                </p>
                <ul>
                  <li>Pathao: <strong>courier.pathao.com</strong></li>
                  <li>Sundarban: <strong>sundarbancourier.com</strong></li>
                  <li>RedX: <strong>redx.com.bd</strong></li>
                </ul>
                <p>
                  If your tracking has not updated for more than 3 working days (Dhaka)
                  or 6 working days (outside Dhaka), please{" "}
                  <a href="/contact#track">contact us</a> with your order number and we
                  will investigate with the courier.
                </p>

                <h2>Lost or damaged deliveries</h2>
                <p>
                  If your parcel arrives visibly damaged, please photograph the outer
                  packaging and the contents before opening further, and contact us within
                  48 hours. We will file a claim with the courier and arrange a free
                  replacement.
                </p>
                <p>
                  If your tracking shows delivery confirmed but you haven't received the
                  parcel, check with neighbours and your building reception first, then
                  contact us within 5 working days of the stated delivery date. We will
                  open an investigation. Most cases are resolved within 3–5 working days.
                </p>

                <h2>Address accuracy</h2>
                <p>
                  Please provide your full delivery address — including building name,
                  floor, apartment/house number, road, area, and thana — at checkout.
                  Incomplete addresses cause significant courier delays. Parcels returned
                  due to an incorrect or incomplete address will be re-shipped at your
                  expense. {siteConfig.legalName} is not responsible for orders delivered
                  to an incorrectly provided address.
                </p>

                <h2>Questions</h2>
                <p>
                  For delivery queries, contact our team at{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>{" "}
                  or reach us on WhatsApp at{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    {siteConfig.contact.phone}
                  </a>
                  . Please include your order number in all correspondence.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact#track" variant="primary" size="md">
                  Track my order
                </Button>
                <Button href="/returns" variant="outline" size="md">
                  Returns policy
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
