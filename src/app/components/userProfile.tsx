import Link from "next/link";

import { logoutAction } from "@/app/login/actions";
import { getSession } from "@/lib/auth/auth";
import { getUserById } from "@/lib/user/userRepository";

export default async function UserProfile() {
  const session = await getSession();

  const user = session
    ? await getUserById(session.userId)
    : null;

  return user ? (
  <div className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 font-bold text-white">
      {user.username.charAt(0).toUpperCase()}
    </div>

    <span className="font-medium text-rose-800">
      {user.username}
    </span>

    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full bg-rose-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-rose-600"
      >
        Salir
      </button>
    </form>
  </div>
) : (
  <div className="flex items-center gap-3">
    <Link
      href="/login"
      className="rounded-full border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-white"
    >
      Entrar
    </Link>

    <Link
      href="/signup"
      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
    >
      Registrarse
    </Link>
  </div>
);
}