"use server";

import { loginSchema } from "@/lib/user/userSchema";
import { findUserByEmail } from "@/lib/user/userRepository";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export type LoginState = {
  success: boolean;
  message?: string;
  values: {
    email: string;
  };
  errors: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAction(
  previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const values = {
    email: formData.get("email")?.toString().trim().toLowerCase() ?? "",
    password: formData.get("password")?.toString() ?? "",
  };

  const result = loginSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: "Errores de validación",
      values: {
        email: values.email,
      },
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await findUserByEmail(values.email);

  if (!user) {
    return {
      success: false,
      message: "Correo o contraseña incorrectos.",
      values: {
        email: values.email,
      },
      errors: {},
    };
  }

  const validPassword = await verifyPassword(
    values.password,
    user.passwordHash,
  );

  if (!validPassword) {
    return {
      success: false,
      message: "Correo o contraseña incorrectos.",
      values: {
        email: values.email,
      },
      errors: {},
    };
  }

  await createSession(user.id, user.username);

  redirect("/ads");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
