import { pageMetadata } from "@/lib/seo";
import { AccountClient } from "./AccountClient";

export const metadata = pageMetadata({
  title: "Sign In or Create Account",
  description:
    "Sign in to your Jolchap account or create one to track orders, save designs and check out faster.",
  path: "/account",
  noindex: true,
});

export default function AccountPage() {
  return <AccountClient />;
}
