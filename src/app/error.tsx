"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error(error);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold text-rose-600">
        ¡Ups! Algo salió mal
      </h1>

      <p className="max-w-md text-gray-600">
        Ocurrió un error inesperado mientras se cargaba esta página.
      </p>

      <button
        onClick={reset}
        className="rounded-lg bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}