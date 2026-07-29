import prisma from "@/lib/prisma";
import { CreateUserParams } from "./userTypes";

export async function findUserByEmailOrUsername(
  email: string,
  username: string,
) {
  return prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
}

export async function createUser({
  name,
  username,
  email,
  passwordHash,
}: CreateUserParams) {
  return prisma.user.create({
    data: {
      name,
      username,
      email,
      passwordHash,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id?: number) {
  if (!id) return null;

  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
}
