import { notFound } from "next/navigation";
import Image from "next/image";
import { getAdById } from "@/lib/ads/adsRepository";
import Link from "next/link";
import { deleteAdAction } from "./actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdDetailPage({ params }: Props) {
  const { id } = await params;

  const ad = await getAdById(Number(id));

  if (!ad) {
    notFound();
  }

 return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">
        {/* Imagen */}
        <div className="overflow-hidden rounded-2xl border bg-gray-100">
          <Image
            src={ad.imageUrl || "/images/no-image.png"}
            alt={ad.title}
            width={700}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Información */}
        <div className="flex flex-col">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {ad.title}
          </h1>

          <p className="mb-6 text-4xl font-extrabold text-rose-600">
            ${Number(ad.price).toFixed(2)}
          </p>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">
              Descripción
            </h2>

            <p className="leading-7 text-gray-700">
              {ad.description}
            </p>
          </div>
          <div className="mb-8 flex gap-3">
            <Link
              href={`/ads/${ad.id}/edit`}
              className="rounded-lg bg-rose-600 px-5 py-2 font-medium text-white transition hover:bg-rose-700"
            >
              ✏️ Editar
            </Link>

            <form action={deleteAdAction}>
              <input type="hidden" name="id" value={ad.id} />

              <button
                type="submit"
                className="rounded-lg border border-red-500 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50"
              >
                🗑️ Eliminar
              </button>
            </form>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-semibold">
              Categorías
            </h2>

            <div className="flex flex-wrap gap-2">
              {ad.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-xl border border-rose-200 bg-rose-50 p-5">
            <p className="text-sm text-gray-500">
              Publicado por
            </p>

            <p className="text-lg font-semibold">
              {ad.owner.username}
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}