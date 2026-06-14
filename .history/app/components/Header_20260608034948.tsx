import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-orange-600"
        >
          ATEAM AUTO
        </Link>

        <nav className="flex gap-6">
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
        </nav>
      </div>
    </header>
  );
}