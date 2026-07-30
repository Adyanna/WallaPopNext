import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-6xl font-bold text-rose-500">
        404
      </h1>

      <h2 className="text-2xl font-semibold">
        Página no encontrada
      </h2>

      <p className="max-w-md text-gray-600">
        El recurso que buscas no existe o fue eliminado.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-rose-500 px-6 py-3 text-white hover:bg-rose-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
}