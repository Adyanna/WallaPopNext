import { findAds ,countAds} from "@/lib/ads/adsRepository";
import AdCard from "./components/adsCard";
import EmptyState from "@/app/components/emptyState";
import { Metadata } from "next";
import { ADS_PAGE_SIZE, parseAdsQuery } from "@/lib/ads/adsQuery";
import SearchAdsForm from "./components/searchForm";
import Pagination from "./components/Pagination";

export const metadata: Metadata = {
  title: "WallaPop Next",
  description: "Marketplace desarrollado con Next.js y TypeScript para la compra y venta de artículos.",
};

type AdsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};


export default async function AdsPage({searchParams}: AdsPageProps) {
  const filters = await parseAdsQuery(await searchParams);
  // const ads = await findAds(filters);

  const [ads, total] = await Promise.all([
  findAds(filters),
  countAds(filters),
  ]);

  const totalPages = Math.ceil(total / ADS_PAGE_SIZE);

 return (
    <main className="mx-auto max-w-7xl px-8 py-10">
     <div className="mb-10">
        <h1 className="text-5xl font-black text-rose-600">
            Últimos anuncios
        </h1>

        <p className="mt-2 text-gray-500">
            Encuentra productos increíbles publicados por la comunidad.
        </p>
    </div>
    <SearchAdsForm  query={filters.query} tag={filters.tag} order={filters.order}/>

      {ads.length === 0 ? (
        <EmptyState title="No hay anuncios disponibles" description="Cuando alguien publique un anuncio aparecerá aquí."/>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}

      <Pagination filters={filters} totalPages={totalPages}/>
    </main>
  );
}