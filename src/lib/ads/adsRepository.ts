import prisma from "@/lib/prisma";
import { CreateAdsParams, UpdateAdsParams } from "./adsTypes";

export async function findAds() {
  return prisma.ad.findMany({
    where: {
      isPublished: true,
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createAd({
  title,
  description,
  price,
  imageUrl,
  tags,
  ownerId,
}: CreateAdsParams) {
  return prisma.ad.create({
    data: {
      title,
      description,
      price,
      imageUrl,
      tags,
      ownerId,
    },
  });
}

export async function getAdById(id: number) {
  return prisma.ad.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

export async function updateAd({
  id,
  title,
  description,
  price,
  imageUrl,
  tags,
}: UpdateAdsParams) {
  return prisma.ad.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      price,
      imageUrl,
      tags,
    },
  });
}

export async function deleteAd(id: number) {
  return prisma.ad.delete({
    where: {
      id,
    },
  });
}
