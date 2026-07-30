import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadsDir, { recursive: true });
  const extension = path.extname(file.name);
  const fileName = `${crypto.randomUUID()}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, fileName), buffer);
  return `/uploads/${fileName}`;
}
