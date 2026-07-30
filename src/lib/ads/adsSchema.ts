import { z } from "zod";

export const adSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(1000, "La descripción es demasiado larga"),
  price: z.coerce.number().positive("El precio debe ser mayor que cero"),
  tags: z.array(z.string()).min(1, "Seleccione al menos una categoría"),
});
