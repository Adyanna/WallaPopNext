import { Tag } from "@/generated/prisma/client";

export type AdsState = {
  success: boolean;
  message?: string;
  values: {
    title: string;
    description: string;
    price: string;
    tags: string[];
  };
  errors: {
    title?: string[];
    description?: string[];
    price?: string[];
    image?: string[];
    tags?: string[];
  };
};

export type CreateAdsParams = {
  title: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  tags: Tag[];
  ownerId: number;
};

export type UpdateAdsParams = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  tags: Tag[];
};
