import prisma from "@/lib/prisma";

export async function getCommentsByAd(adId: number) {
  return prisma.comment.findMany({
    where: {
      adId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

type CreateCommentParams = {
  adId: number;
  userId: number;
  message: string;
};

export async function createComment({
  adId,
  userId,
  message,
}: CreateCommentParams) {
  return prisma.comment.create({
    data: {
      adId,
      userId,
      message,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
  });
}
