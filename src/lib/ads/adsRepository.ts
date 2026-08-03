import prisma from "@/lib/prisma";
import { CreateAdsParams, UpdateAdsParams } from "./adsTypes";
import { AdsQuery, ADS_PAGE_SIZE } from "./adsQuery";
import { Tag } from "@/generated/prisma/enums";

export async function findAds({ query, tag, order, page }: AdsQuery) {
  const selectedTag =
    tag && Object.values(Tag).includes(tag as Tag) ? (tag as Tag) : undefined;

  return prisma.ad.findMany({
    where: {
      isPublished: true,

      ...(query && {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(selectedTag && {
        tags: {
          has: selectedTag,
        },
      }),
    },

    include: {
      owner: {
        select: {
          id: true,
          username: true,
        },
      },
    },

    orderBy: order === "asc" ? { createdAt: "asc" } : { createdAt: "desc" },
    skip: (page - 1) * ADS_PAGE_SIZE,
    take: ADS_PAGE_SIZE,
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

export async function countAds({
  query,
  tag,
}: Pick<AdsQuery, "query" | "tag">) {
  const selectedTag =
    tag && Object.values(Tag).includes(tag as Tag) ? (tag as Tag) : undefined;

  return prisma.ad.count({
    where: {
      isPublished: true,

      ...(query && {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(selectedTag && {
        tags: {
          has: selectedTag,
        },
      }),
    },
  });
}
