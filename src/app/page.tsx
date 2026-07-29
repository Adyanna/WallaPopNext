
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-16">
      <section className="w-full max-w-5xl">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
            WallaPop
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Compra y vende artículos de segunda mano de forma rápida, sencilla y
            segura. Publica tus anuncios, descubre oportunidades y guarda tus
            favoritos.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/ads"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-indigo-700"
            >
              Explorar anuncios
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/signup"
              className="rounded-xl border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Crear cuenta
            </Link>
          </div>
        </div>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg">
            <div className="mb-4 text-4xl">📢</div>

            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Publica anuncios
            </h2>

            <p className="text-slate-600">
              Comparte los artículos que ya no utilizas y llega fácilmente a
              nuevos compradores.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg">
            <div className="mb-4 text-4xl">🔍</div>

            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Encuentra oportunidades
            </h2>

            <p className="text-slate-600">
              Explora diferentes categorías y descubre productos al mejor
              precio.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg">
            <div className="mb-4 text-4xl">❤️</div>

            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Guarda favoritos
            </h2>

            <p className="text-slate-600">
              Marca los anuncios que más te interesan y vuelve a ellos cuando
              quieras.
            </p>
          </article>
        </section>

        <footer className="mt-20 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} · Desarrollado por{" "}
          <span className="font-semibold tracking-wide">AMCQ</span>
        </footer>
      </section>
    </main>
    </div>
  );
}
