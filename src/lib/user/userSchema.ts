import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre es demasiado largo"),

    username: z
      .string()
      .trim()
      .min(3, "El usuario debe tener al menos 3 caracteres")
      .max(30, "El usuario no puede tener más de 30 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y _"),

    email: z.email("Correo electrónico inválido").trim().toLowerCase(),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email("Ingrese un correo electrónico válido.").trim().toLowerCase(),

  password: z.string().min(1, "La contraseña es obligatoria."),
});
