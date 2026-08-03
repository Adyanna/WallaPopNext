import Link from "next/link";

import { AdsQuery, adsListHref } from "@/lib/ads/adsQuery";

type Props = {
  filters: AdsQuery;
  totalPages: number;
};

export default function Pagination({
  filters,
  totalPages,
}: Props) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Link
        href={adsListHref(filters, filters.page - 1)}
        className={`rounded-lg border px-4 py-2 ${
          filters.page === 1
            ? "pointer-events-none opacity-50"
            : ""
        }`}
      >
        ← Anterior
      </Link>

      <span className="font-medium">
        Página {filters.page} de {totalPages}
      </span>

      <Link
        href={adsListHref(filters, filters.page + 1)}
        className={`rounded-lg border px-4 py-2 ${
          filters.page === totalPages
            ? "pointer-events-none opacity-50"
            : ""
        }`}
      >
        Siguiente →
      </Link>
    </div>
  );
}