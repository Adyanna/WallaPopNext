import { notFound } from "next/navigation";

import AdsForm from "../../components/adsForm";
import { updateAdAction } from "./actions";
import { getAdById } from "@/lib/ads/adsRepository";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdPage({ params }: Props) {
  const { id } = await params;

  const ad = await getAdById(Number(id));

  if (!ad) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Editar anuncio
      </h1>

      <AdsForm
        id={ad.id}
        action={updateAdAction}
        initialValues={{
          title: ad.title,
          description: ad.description,
          price: ad.price.toString(),
          tags: ad.tags,
        }}
        submitText="Guardar cambios"
      />
    </main>
  );
}