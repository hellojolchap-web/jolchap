import { pageMetadata } from "@/lib/seo";
import CartClient from "./CartClient";

export const metadata = pageMetadata({
  title: "Your Bag",
  description: "Review your bag and check out.",
  path: "/cart",
  noindex: true,
});

export default function CartPage() {
  return <CartClient />;
}
