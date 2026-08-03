import Link from "next/link";

import { Tag } from "@/generated/prisma/enums";

type Props = {
  query: string;
  tag: string;
  order: "asc" | "desc";
};

export default function SearchAdsForm({
  query,
  tag,
  order,
}: Props) {
  return (
    <form
      action="ads/"
      method="GET"
      className="mb-8 flex flex-wrap items-end gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="query" className="mb-1 text-sm font-medium">
          Buscar
        </label>

        <input
          id="query"
          name="query"
          defaultValue={query}
          placeholder="Buscar anuncios..."
          className="rounded-lg border px-4 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="tag" className="mb-1 text-sm font-medium">
          Categoría
        </label>

        <select
          id="tag"
          name="tag"
          defaultValue={tag}
          className="rounded-lg border px-4 py-2"
        >
          <option value="">Todas</option>

          {Object.values(Tag).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="order" className="mb-1 text-sm font-medium">
          Orden
        </label>

        <select
          id="order"
          name="order"
          defaultValue={order}
          className="rounded-lg border px-4 py-2"
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguos</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-rose-600 px-5 py-2 font-medium text-white hover:bg-rose-700"
      >
        Buscar
      </button>

      <Link
        href="/ads"
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        Limpiar
      </Link>
    </form>
  );
}