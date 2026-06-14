"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const menuLinks = [
  { href: "/", label: "Hlavní" },
  { href: "/cars", label: "Vozidla" },
  { href: "/sell", label: "Prodat auto" },
  { href: "/contact", label: "Kontakt" },
  { href: "/login", label: "Přihlášení" },
  { href: "/register", label: "Registrace" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ATEAM AUTO"
              width={500}
              height={140}
              className="h-14 w-auto object-contain sm:h-20"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-orange-600"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/dashboard"
              className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Můj účet
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-xl border px-4 py-2 text-2xl font-bold lg:hidden"
            aria-label="Otevřít menu"
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>

        {isOpen && (
          <nav className="grid gap-2 border-t py-4 text-base font-semibold lg:hidden">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700"
            >
              Můj účet
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}