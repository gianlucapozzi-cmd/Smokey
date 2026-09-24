import type { Metadata } from "next";
import { Fraunces, Mona_Sans } from "next/font/google";
import { StripHash } from "@/components/ScrollTo";
import "./globals.css";

const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Community SOSmoke — Entra nel giro",
  description:
    "Il filo diretto con i negozi SOSmoke di Ascoli Piceno, San Benedetto del Tronto, Spinetoli e Porto San Giorgio. Consigli, promo e un posto dove dirci la tua.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${mona.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">
        <StripHash />
        {children}
      </body>
    </html>
  );
}
