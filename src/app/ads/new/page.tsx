import AdsForm from "../components/adsForm";
import { createAdAction } from "./actions";

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