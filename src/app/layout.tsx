import type { Metadata, Viewport } from "next";
import { Amiri } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { ScrollEffects } from "@/components/motion/scroll-effects";
import { JsonLd, agencySchema } from "@/components/json-ld";
import { site } from "@/config/site";
import "./globals.css";

// Only used for the verified Talbiyah on the Hajj page; not preloaded.
const arabic = Amiri({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Al-Safaa Travels & Tours | Hajj & Umrah Packages from Sri Lanka",
    template: "%s | Al-Safaa Travels & Tours",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_LK",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Keep staging/preview builds out of search results until launch.
  ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#082826",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={arabic.variable} suppressHydrationWarning>
      <head>
        {/* Satoshi (Indian Type Foundry), served by Fontshare as its licence
            requires for a public repository — the files are not self-hosted. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap" />
        {/* Lets CSS hide hero copy before GSAP fades it in, without hiding it when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-gold-500 px-5 py-3 text-sm font-bold text-ink-950 focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <ScrollEffects>
          <main id="main">{children}</main>
        </ScrollEffects>
        <Footer />
        <FloatingWhatsApp />
        <JsonLd data={agencySchema()} />
      </body>
    </html>
  );
}
