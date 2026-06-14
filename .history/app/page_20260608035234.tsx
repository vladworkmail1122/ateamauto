export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Kupujte a prodávejte auta v Česku
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
          Moderní marketplace pro ojetá auta. Rychlé vyhledávání, přehledné inzeráty a jednoduché přidání vozidla.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 rounded-2xl bg-white p-4 shadow md:grid-cols-4">
          <input className="rounded-xl border px-4 py-3" placeholder="Značka" />
          <input className="rounded-xl border px-4 py-3" placeholder="Model" />
          <input className="rounded-xl border px-4 py-3" placeholder="Cena do" />
          <a
            href="/cars"
            className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Hledat
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/cars"
            className="rounded-full bg-gray-900 px-6 py-3 font-semibold text-white"
          >
            Prohlížet auta
          </a>

          <a
            href="/sell"
            className="rounded-full border px-6 py-3 font-semibold"
          >
            Přidat inzerát
          </a>
        </div>
      </section>
    </main>
  );
}