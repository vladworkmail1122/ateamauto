import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ATEAM AUTO | Auto marketplace Czechia",
    template: "%s | ATEAM AUTO",
  },
  description:
    "ATEAM AUTO marketplace for vehicle sales and purchases in Czechia. Prodej a nákup vozidel v České republice, inzerce aut, kontrola vozidel, servis, STK, dokumenty a rychlý výkup.",
  keywords: [
    "auta",
    "prodej aut",
    "nákup aut",
    "ojetá auta",
    "auto marketplace",
    "car marketplace Czechia",
    "cars for sale Czech Republic",
    "продажа авто Чехия",
    "купить авто Чехия",
    "продаж авто Чехія",
    "купити авто Чехія",
    "ATEAM AUTO",
    "Jihlava",
    "autoservis",
    "STK",
    "výkup vozidel",
  ],
  authors: [{ name: "ATEAM AUTO" }],
  creator: "ATEAM AUTO",
  publisher: "ATEAM AUTO",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "ATEAM AUTO",
    title: "ATEAM AUTO | Auto marketplace Czechia",
    description:
      "Vehicle marketplace in Czechia for selling, buying and presenting cars.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ATEAM AUTO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATEAM AUTO | Auto marketplace Czechia",
    description:
      "Vehicle marketplace in Czechia for selling, buying and presenting cars.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
