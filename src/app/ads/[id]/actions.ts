"use server";

import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

import { getSession } from "@/lib/auth/auth";
import { deleteAd, getAdById } from "@/lib/ads/adsRepository";

export async function deleteAdAction(formData: FormData) {
  const id = Number(formData.get("id"));

  const ad = await getAdById(id);

  if (!ad) {
    notFound();
  }

  const session = await getSession();

  if (!session || session.userId !== ad.ownerId) {
    throw new Error("No autorizado");
  }

  await deleteAd(id);

  revalidatePath("/ads");
  redirect("/ads");
}
