import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="ATEAM AUTO"
                width={300}
                height={90}
                className="h-16 w-auto rounded bg-white object-contain p-2"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              ATEAM AUTO MARKETPLACE CZECHIA — prodej, nákup a prezentace
              vozidel v České republice.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Rychlé odkazy</h3>

            <div className="mt-4 grid gap-3 text-sm text-gray-300">
              <Link href="/" className="hover:text-orange-500">
                Hlavní
              </Link>

              <Link href="/cars" className="hover:text-orange-500">
                Vozidla
              </Link>

              <Link href="/sell" className="hover:text-orange-500">
                Prodat auto
              </Link>

              <Link href="/dashboard" className="hover:text-orange-500">
                Můj účet
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Služby</h3>

            <div className="mt-4 grid gap-3 text-sm text-gray-300">
              <p>Prodej a nákup vozidel</p>
              <p>Kontrola auta před koupí</p>
              <p>Autoservis a diagnostika</p>
              <p>Příprava na STK</p>
              <p>Vyřízení dokumentů</p>
              <p>Rychlý výkup vozidel</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Kontakt</h3>

            <div className="mt-4 grid gap-3 text-sm text-gray-300">
              <a href="tel:+420723964647" className="hover:text-orange-500">
                +420 723 964 647
              </a>

              <a
                href="https://wa.me/420723964647"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                WhatsApp
              </a>

              <Link
                href="/contact"
                className="rounded-xl border border-white/20 px-4 py-3 text-center font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                Kontakt
              </Link>

              <p>Jihlava, Česká republika</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ATEAM AUTO. Všechna práva vyhrazena.</p>

            <p>Auto marketplace Czechia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}