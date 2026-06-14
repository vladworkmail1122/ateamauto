import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATEAM AUTO",
  description: "Prodej a nákup vozidel v České republice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ATEAM AUTO"
                width={500}
                height={140}
                className="h-28 w-auto"
                priority
              />
            </Link>

            <nav className="flex items-center gap-8 text-base font-semibold">
              <Link href="/" className="hover:text-orange-600">
                Hlavní
              </Link>

              <Link href="/cars" className="hover:text-orange-600">
                Vozidla
              </Link>

              <Link href="/sell" className="hover:text-orange-600">
                Prodat auto
              </Link>

              <Link href="/contact" className="hover:text-orange-600">
                Kontakt
              </Link>

              <Link href="/login" className="hover:text-orange-600">
                Přihlášení
              </Link>

              <Link href="/register" className="hover:text-orange-600">
                Registrace
              </Link>

              <Link
                href="/dashboard"
                className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
              >
                Můj účet
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}