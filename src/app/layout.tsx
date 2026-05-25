import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.alphawastemanagement.com";
const SITE_TITLE = "Alpha Waste Management · Industry waste turned into revenue";
const SITE_DESCRIPTION =
  "A Mangalam Alloys Ltd. (MAL) venture. Patented zero-residue valorization for industrial steel waste. 100% mass balance, commercial scale, regional hubs across India.";

export const metadata: Metadata = {
  /* metadataBase makes any relative URLs in openGraph / twitter / alternates
     resolve against the production domain. Required for share previews on
     WhatsApp, LinkedIn, Slack, etc. to render correctly. */
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Alpha Waste Management",
    "Mangalam Alloys",
    "industrial waste valorization",
    "waste recycling",
    "zero residue",
    "steel waste",
    "circular economy",
    "hydrometallurgy",
    "cement-less bricks",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Alpha Waste Management",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-clip">
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
