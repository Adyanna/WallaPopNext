import { Metadata } from "next";
import AdsForm from "../components/adsForm";
import { createAdAction } from "./actions";

export const metadata :Metadata= {
  title: "Nuevo anuncio | Wallapop Next",
  description: "Publica un nuevo anuncio en el marketplace.",
};

export default function NewAdPage() {
  return (
    <section className="py-10">
      <AdsForm
        action={createAdAction}
        submitText="Publicar anuncio"
      />
    </section>
  );
}