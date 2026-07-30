"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  console.error(error);

  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-pink-50">
        <div className="rounded-xl bg-white p-10 shadow-lg text-center">
          <h1 className="mb-4 text-4xl font-bold text-rose-600">
            Error crítico
          </h1>

          <p className="mb-6 text-gray-600">
            La aplicación encontró un problema inesperado.
          </p>

          <button
            onClick={reset}
            className="rounded-lg bg-rose-500 px-6 py-3 text-white hover:bg-rose-600"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}