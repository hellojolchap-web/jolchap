import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteShell } from "@/components/layout/SiteShell";
import { FloatingWidgets } from "@/components/widgets/FloatingWidgets";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { siteConfig } from "@/config/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-bone antialiased">
        <SiteShell
          announcement={<AnnouncementBar />}
          header={<Header />}
          footer={<Footer />}
          widgets={<FloatingWidgets />}
          cart={<CartDrawer />}
        >
          {children}
        </SiteShell>
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
