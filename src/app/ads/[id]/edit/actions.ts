"use server";

import { Tag } from "@/generated/prisma/enums";
import { getAdById, updateAd } from "@/lib/ads/adsRepository";
import { adSchema } from "@/lib/ads/adsSchema";
import { AdsState } from "@/lib/ads/adsTypes";
import { getSession } from "@/lib/auth/auth";
import { uploadImage } from "@/lib/uploads/uploadFile";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function updateAdAction(
  previousState: AdsState,
  formData: FormData,
): Promise<AdsState> {
  const errors: AdsState["errors"] = {};

  const image = formData.get("image") as File;

  const values = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "",
    tags: formData.getAll("tags").map((tag) => tag.toString()),
  };

  if (image.size > 0) {
    const imageIsValid =
      ["image/jpeg", "image/png", "image/webp"].includes(image.type) &&
      image.size <= 5 * 1024 * 1024;

    if (!imageIsValid) {
      errors.image = [
        "Debes seleccionar una imagen JPG, PNG o WEBP de máximo 5 MB.",
      ];
    }
  }

  const validation = adSchema.safeParse(values);

  if (!validation.success) {
    Object.assign(errors, validation.error.flatten().fieldErrors);
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Errores de validación",
      values,
      errors,
    };
  }
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Debes iniciar sesión.",
      values,
      errors: {},
    };
  }

  const id = Number(formData.get("id"));

  const ad = await getAdById(id);

  if (!ad) {
    notFound();
  }

  if (ad.ownerId !== session.userId) {
    return {
      success: false,
      message: "No tienes permiso para editar este anuncio.",
      values,
      errors: {},
    };
  }

  const data = validation.data!;

  const imagePath = image.size > 0 ? await uploadImage(image) : ad.imageUrl;

  await updateAd({
    id,
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: imagePath,
    tags: data.tags as Tag[],
  });

  revalidatePath("/ads");
  revalidatePath(`/ads/${id}`);
  redirect(`/ads/${id}`);
}
