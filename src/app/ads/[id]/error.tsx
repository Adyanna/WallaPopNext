"use client";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        Ocurrió un error
      </h1>

      <p className="mb-2 text-gray-700">
        No fue posible cargar el anuncio.
      </p>

      <p className="mb-8 text-sm text-gray-500">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition hover:bg-rose-700"
      >
        Intentar nuevamente
      </button>
    </main>
  );
}