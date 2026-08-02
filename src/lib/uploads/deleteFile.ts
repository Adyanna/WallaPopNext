"use server";

import fs from "fs/promises";
import path from "path";

export async function deleteFile(filePath: string) {
  if (!filePath) return;

  try {
    const fullPath = path.join(process.cwd(), "public", filePath);

    await fs.unlink(fullPath);
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
  }
}
