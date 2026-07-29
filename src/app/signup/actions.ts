"use server";

import { hashPassword } from "@/lib/auth/password";
import {
  findUserByEmailOrUsername,
  createUser,
} from "@/lib/user/userRepository";
import { signupSchema } from "@/lib/user/userSchema";
import { redirect } from "next/navigation";

export type SignupState = {
  success: boolean;
  message?: string;
  values: {
    name: string;
    username: string;
    email: string;
  };
  errors: {
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

export async function signupAction(
  previousState: unknown,
  formData: FormData,
): Promise<SignupState> {
  const values = {
    name: formData.get("name")?.toString().trim() ?? "",
    username: formData.get("username")?.toString().trim() ?? "",
    email: formData.get("email")?.toString().trim().toLowerCase() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
  };

  const result = signupSchema.safeParse(values);

  console.log(values);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Errores de validación",
      values: {
        name: values.name,
        username: values.username,
        email: values.email,
      },
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingUser = await findUserByEmailOrUsername(
    values.email,
    values.username,
  );

  if (existingUser) {
    return {
      success: false,
      values: {
        name: values.name,
        username: values.username,
        email: values.email,
      },
      errors: {
        email:
          existingUser.email === values.email
            ? ["Este correo ya está registrado."]
            : undefined,

        username:
          existingUser.username === values.username
            ? ["Este nombre de usuario ya existe."]
            : undefined,
      },
    };
  }

  const passwordHash = await hashPassword(values.password);

  await createUser({
    name: values.name,
    username: values.username,
    email: values.email,
    passwordHash,
  });

  redirect("/login");
}
