import Link from "next/link";
import UserProfile from "./userProfile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-pink-200 bg-gradient-to-r from-pink-100 via-pink-200 to-rose-300 shadow-sm">
      <div className="mx-auto flex h-25 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-rose-700 transition hover:text-rose-800"
        >
          🛍️ Wallapop
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {/* <Link
            href="/ads"
            className="rounded-full px-4 py-2 text-sm font-medium text-rose-800 transition hover:bg-white/50"
          >
            Anuncios
          </Link> */}

          <Link
            href="/ads/new"
            className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-rose-600"
          >
            + Publicar
          </Link>
        </nav>

        <UserProfile />

      </div>
    </header>
  );
}