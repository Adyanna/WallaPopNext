import prisma from "@/lib/prisma";

type ToggleLikeParams = {
  adId: number;
  userId: number;
};

export async function countLikes(adId: number) {
  return prisma.like.count({
    where: {
      adId,
    },
  });
}

export async function userLikedAd(
  adId: number,
  userId: number,
) {
  const like = await prisma.like.findUnique({
    where: {
      userId_adId: {
        userId,
        adId,
      },
    },
  });

  return !!like;
}

export async function toggleLike({
  adId,
  userId,
}: ToggleLikeParams) {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_adId: {
        userId,
        adId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    return false;
  }

  await prisma.like.create({
    data: {
      adId,
      userId,
    },
  });

  return true;
}