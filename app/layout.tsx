import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ATEAM AUTO | Prodej a nákup vozidel v Česku",
    template: "%s | ATEAM AUTO",
  },
  description:
    "ATEAM AUTO marketplace pro prodej a nákup vozidel v České republice. Inzerce aut, kontrola vozidel, servis, STK, dokumenty a rychlý výkup.",
  keywords: [
    "auta",
    "prodej aut",
    "nákup aut",
    "ojetá auta",
    "auto marketplace",
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
    title: "ATEAM AUTO | Prodej a nákup vozidel v Česku",
    description:
      "Moderní marketplace pro prodej a nákup vozidel v České republice.",
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
    title: "ATEAM AUTO | Prodej a nákup vozidel v Česku",
    description:
      "Moderní marketplace pro prodej a nákup vozidel v České republice.",
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