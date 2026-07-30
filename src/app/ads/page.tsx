import { findAds } from "@/lib/ads/adsRepository";
import AdCard from "./components/adsCard";

export default async function AdsPage() {
  const ads = await findAds();

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

      {ads.length === 0 ? (
        <p className="text-gray-500">
          Todavía no existen anuncios.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </main>
  );
}