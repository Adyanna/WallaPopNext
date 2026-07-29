import LoginForm from "./components/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center">
      <div className="w-full rounded-lg border bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Iniciar sesión
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}