import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Hind_Siliguri } from "next/font/google";
import { Toaster } from "sonner";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteShell } from "@/components/layout/SiteShell";
import { FloatingWidgets } from "@/components/widgets/FloatingWidgets";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { ConfirmProvider } from "@/components/providers/ConfirmProvider";
import { siteConfig } from "@/config/site";
import { getSettings } from "@/lib/queries";
import { accentStyle } from "@/lib/theme";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Bengali support — Latin glyphs come from Inter/Archivo; Bengali (বাংলা)
// glyphs fall back to Hind Siliguri so Bangla content renders cleanly.
const bengali = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getSettings();
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${brand.name} — ${brand.tagline}`,
      template: `%s · ${brand.name}`,
    },
    description: brand.description,
    keywords: [
      "custom stamps",
      "rubber stamp",
      "personalised gifts",
      "custom t-shirt printing",
      "photo mug",
      "wax seal",
      "tote bag printing",
      "wedding cards",
      "business cards",
      "Dhaka",
      "Bangladesh",
    ],
    applicationName: brand.name,
    authors: [{ name: brand.legalName, url: siteConfig.url }],
    creator: brand.legalName,
    publisher: brand.legalName,
    category: "shopping",
    formatDetection: { telephone: true, address: false, email: false },
    // OG/Twitter images are provided per-route by the file-based
    // `opengraph-image` cards, so every shared page gets its own preview.
    openGraph: {
      type: "website",
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.shortDescription,
      url: siteConfig.url,
      siteName: brand.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.shortDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    appleWebApp: {
      capable: true,
      title: brand.name,
      statusBarStyle: "black-translucent",
    },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EF" },
    { media: "(prefers-color-scheme: dark)", color: "#0C141B" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const themeCss = accentStyle(settings.brand.accentColor);

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${bengali.variable}`}>
      <body className="min-h-screen bg-bone antialiased">
        {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-onyx-950 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-elevated"
        >
          Skip to content
        </a>
        <SettingsProvider value={settings}>
          <ConfirmProvider>
            <SiteShell
              announcement={<AnnouncementBar />}
              header={<Header />}
              footer={<Footer settings={settings} />}
              widgets={<FloatingWidgets />}
              cart={<CartDrawer />}
            >
              {children}
            </SiteShell>
          </ConfirmProvider>
        </SettingsProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: "!rounded-xl !border-onyx-100 !font-sans",
            },
          }}
        />
      </body>
    </html>
  );
}
