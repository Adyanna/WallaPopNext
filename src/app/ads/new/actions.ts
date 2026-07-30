"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";
import { createAd } from "@/lib/ads/adsRepository";
import { adSchema } from "@/lib/ads/adsSchema";
import { AdsState } from "@/lib/ads/adsTypes";
import { Tag } from "@/generated/prisma/client";
import { uploadImage } from "@/lib/uploads/uploadFile";

export async function createAdAction(
  previousState: AdsState,
  formData: FormData,
): Promise<AdsState> {
  const errors: AdsState["errors"] = {};
  const imageFile = formData.get("image") as File;

  const imageIsValid =
    imageFile &&
    imageFile.size > 0 &&
    ["image/jpeg", "image/png", "image/webp"].includes(imageFile.type) &&
    imageFile.size <= 5 * 1024 * 1024;

  if (!imageIsValid) {
    errors.image = [
      "Debes seleccionar una imagen JPG, PNG o WEBP de máximo 5 MB.",
    ];
  }
  const values = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "",
    tags: formData.getAll("tags").map((tag) => tag.toString()),
  };
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
      message: "Debes iniciar sesión para publicar un anuncio.",
      values,
      errors: {},
    };
  }
  try {
    const data = validation.data!;
    const imagePath = await uploadImage(imageFile);
    await createAd({
      title: data.title,
      description: data.description,
      price: data.price,
      imageUrl: imagePath,
      tags: data.tags as Tag[],
      ownerId: session.userId,
    });
  } catch (error) {
    console.error("ERROR CREATE AD");
    console.error(error);
    return {
      success: false,
      message: "Error al guardar",
      values,
      errors: {},
    };
  }
  revalidatePath("/ads");
  redirect("/ads");
}
