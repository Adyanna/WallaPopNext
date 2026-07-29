"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {
  success: false,
  values: {
    email: "",
  },
  errors: {},
};

export default function LoginForm() {
  const [state, action, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={action} className="space-y-4">

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          defaultValue={state.values.email}
          className="w-full rounded border p-2"
        />

        {state.errors.email?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label>Contraseña</label>

        <input
          type="password"
          name="password"
          className="w-full rounded border p-2"
        />

        {state.errors.password?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {state.message && (
        <p className="text-red-600">
          {state.message}
        </p>
      )}

      <button
        disabled={pending}
        className="w-full rounded bg-green-700 p-2 text-white hover:bg-green-800 disabled:opacity-50"
      >
        {pending ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>

    </form>
  );
}