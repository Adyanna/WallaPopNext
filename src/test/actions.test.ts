import { beforeEach, describe, expect, it, vi } from "vitest";

import { createAdAction } from "@/app/ads/new/actions";
import { createAd } from "@/lib/ads/adsRepository";
import { getSession } from "@/lib/auth/auth";
import { uploadImage } from "@/lib/uploads/uploadFile";

vi.mock("@/lib/ads/adsRepository");
vi.mock("@/lib/auth/auth");
vi.mock("@/lib/uploads/uploadFile");
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("createAdAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return validation errors when data is invalid", async () => {
    const formData = new FormData();

    const result = await createAdAction(
      {
        success: false,
        values: {
          title: "",
          description: "",
          price: "",
          tags: [],
        },
        errors: {},
      },
      formData,
    );

    expect(result.success).toBe(false);
    expect(result.message).toBe("Errores de validación");

    expect(result.errors.title).toBeDefined();
    expect(result.errors.description).toBeDefined();
    expect(result.errors.price).toBeDefined();
    expect(result.errors.tags).toBeDefined();
    expect(result.errors.image).toBeDefined();
  });

  it("should create an ad successfully", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: 1,
      username: "ana",
    } as never);

    vi.mocked(uploadImage).mockResolvedValue("/uploads/test.jpg");

    vi.mocked(createAd).mockResolvedValue({} as never);

    const formData = new FormData();

    formData.append("title", "MacBook Pro");
    formData.append("description", "Excelente estado");
    formData.append("price", "1500");
    formData.append("tags", "ELECTRONICS");

    formData.append(
      "image",
      new File(["image"], "test.jpg", {
        type: "image/jpeg",
      }),
    );

    await createAdAction(
      {
        success: false,
        values: {
          title: "",
          description: "",
          price: "",
          tags: [],
        },
        errors: {},
      },
      formData,
    );

    expect(uploadImage).toHaveBeenCalledOnce();

    expect(createAd).toHaveBeenCalledWith({
      title: "MacBook Pro",
      description: "Excelente estado",
      price: 1500,
      imageUrl: "/uploads/test.jpg",
      tags: ["ELECTRONICS"],
      ownerId: 1,
    });
  });
});
