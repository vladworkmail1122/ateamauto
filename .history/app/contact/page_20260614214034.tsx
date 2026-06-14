import Link from "next/link";

export const metadata = {
  title: "Kontakt | ATEAM AUTO",
  description: "Kontaktujte ATEAM AUTO pro prodej, nákup a servis vozidel.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-white p-6 shadow sm:p-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
              ATEAM AUTO
            </p>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
              Kontaktujte nás
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              Máte zájem o vozidlo, chcete přidat inzerát nebo potřebujete
              poradit s autem? Ozvěte se nám telefonicky, přes WhatsApp nebo
              e-mailem.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="text-xl font-bold">Telefon</h2>

              <a
                href="tel:+420723964647"
                className="mt-3 block text-2xl font-bold text-orange-600 hover:underline"
              >
                +420 723 964 647
              </a>

              <p className="mt-2 text-sm text-gray-500">
                Pro rychlou domluvu volejte nebo pište.
              </p>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="text-xl font-bold">WhatsApp</h2>

              <a
                href="https://wa.me/420723964647"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                Napsat na WhatsApp
              </a>

              <p className="mt-2 text-sm text-gray-500">
                Nejrychlejší způsob kontaktu.
              </p>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="text-xl font-bold">Lokalita</h2>

              <p className="mt-3 text-2xl font-bold text-gray-900">Jihlava</p>

              <p className="mt-2 text-sm text-gray-500">
                Česká republika. Vozidla a služby dle domluvy.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow sm:p-8">
            <h2 className="text-2xl font-bold">S čím vám pomůžeme?</h2>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border bg-gray-50 p-4">
                🚗 Prodej a nákup vozidel
              </div>

              <div className="rounded-2xl border bg-gray-50 p-4">
                🔍 Kontrola auta před koupí
              </div>

              <div className="rounded-2xl border bg-gray-50 p-4">
                🛠️ Autoservis a diagnostika
              </div>

              <div className="rounded-2xl border bg-gray-50 p-4">
                📸 Přidání a správa inzerátu
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-900 p-6 text-white shadow sm:p-8">
            <h2 className="text-2xl font-bold">Rychlá akce</h2>

            <p className="mt-3 text-gray-300">
              Chcete rovnou prodat auto? Přidejte inzerát během pár minut.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/sell"
                className="rounded-xl bg-orange-600 px-5 py-3 text-center font-semibold text-white hover:bg-orange-700"
              >
                Přidat inzerát
              </Link>

              <Link
                href="/cars"
                className="rounded-xl border border-white/20 px-5 py-3 text-center font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                Prohlížet auta
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}