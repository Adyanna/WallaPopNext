"use server";

import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

import { getSession } from "@/lib/auth/auth";
import { deleteAd, getAdById } from "@/lib/ads/adsRepository";
import { createComment } from "@/lib/comments/commentsRepository";
import {
  countLikes,
  toggleLike,
  userLikedAd,
} from "../../../lib/likes/likesRepository";

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

export async function createCommentAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error("Debes iniciar sesión.");
  }

  const adId = Number(formData.get("adId"));
  const message = formData.get("message")?.toString().trim();

  if (!message) {
    throw new Error("El comentario es obligatorio.");
  }

  await createComment({
    adId,
    userId: session.userId,
    message,
  });

  revalidatePath(`/ads/${adId}`);
}

export async function toggleLikeAction(adId: number) {
  const session = await getSession();

  if (!session) {
    throw new Error("Debes iniciar sesión.");
  }

  await toggleLike({
    adId,
    userId: session.userId,
  });

  revalidatePath(`/ads/${adId}`);

  return {
    liked: await userLikedAd(adId, session.userId),
    total: await countLikes(adId),
  };
}
