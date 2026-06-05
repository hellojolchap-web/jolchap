import { ScrollProgress } from "./ScrollProgress";
import { ScrollToTop } from "./ScrollToTop";
import { WhatsAppButton } from "./WhatsAppButton";

/** All persistent floating UI, mounted once in the root layout. */
export function FloatingWidgets() {
  return (
    <>
      <ScrollProgress />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
