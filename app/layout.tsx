import type { Metadata } from "next";
import { Fraunces, Mona_Sans } from "next/font/google";
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
    "Il filo diretto con i negozi SOSmoke di Ascoli Piceno e San Benedetto del Tronto. Consigli, promo e un posto dove dirci la tua.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${mona.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
