import { Metadata } from "next";
import { SignupForm } from "./components/signup-form";

export const metadata:Metadata  = {
  title: "Crear cuenta | Wallapop Next",
  description: "Regístrate para publicar anuncios.",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <SignupForm />
    </main>
  );
}