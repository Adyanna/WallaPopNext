"use client";

import { useActionState } from "react";
import { signupAction,SignupState } from "../actions";

const initialState: SignupState = {
  success: false,
  values:{name:"",username: "",
    email: "",},
  errors: {},
};

export function SignupForm() {
  const [state, action] = useActionState(signupAction, initialState);

  return (
    <form action={action} className="mx-auto w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-center">
        Crear cuenta
      </h1>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Nombre
        </label>

        <input
          name="name"
          defaultValue={state.values.name}
          type="text"
          className="w-full rounded-lg border px-3 py-2"
        />

        {state?.errors?.name && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Usuario
        </label>

        <input
          name="username" defaultValue={state.values.username}
          type="text"
          className="w-full rounded-lg border px-3 py-2"
        />

        {state?.errors?.username && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.username[0]}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Correo
        </label>

        <input
          name="email" defaultValue={state.values.email}
          type="email"
          className="w-full rounded-lg border px-3 py-2"
        />

        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Contraseña
        </label>

        <input
          name="password"
          type="password"
          className="w-full rounded-lg border px-3 py-2"
        />

        {state?.errors?.password && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Confirmar contraseña
        </label>

        <input
          name="confirmPassword"
          type="password"
          className="w-full rounded-lg border px-3 py-2"
        />

        {state?.errors?.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Crear cuenta
      </button>
    </form>
  );
}