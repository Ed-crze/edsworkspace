import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/content";
import { Providers } from "@/components/Providers";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ClientExtras } from "@/components/ClientExtras";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--f-serif",
  fallback: ["Times New Roman", "Georgia", "serif"],
});
const sans = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--f-sans",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
const mono = Geist_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--f-mono",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});

const title = "Edwin Safo | Software Developer, Accra, Ghana";
const description =
  "Edwin Safo is a software developer in Accra, Ghana. He builds full-stack and AI-driven products, with IT support and cybersecurity skills.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: site.name, type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
};

// Runs before first paint: saved choice, else the system setting.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  sameAs: [site.linkedin, site.github].filter(Boolean),
  alumniOf: { "@type": "CollegeOrUniversity", name: site.school },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}[data-faq-panel]{height:auto!important;opacity:1!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-3 top-3 z-[110] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-on-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Providers>
          {children}
          <ClientExtras />
        </Providers>
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
