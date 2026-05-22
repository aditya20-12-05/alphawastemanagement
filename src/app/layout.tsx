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

export const metadata: Metadata = {
  title: "Alpha Waste Management · Industry waste turned into revenue",
  description:
    "A Mangalam Alloys Ltd. venture. Patented zero-residue valorization for industrial steel waste. 100% mass balance, commercial scale, regional hubs across India.",
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
