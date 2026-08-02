"use client";

import { FormEvent, useState } from "react";

type CommentFormProps = {
  onSubmit: (message: string) => Promise<void>;
  disabled?: boolean;
};

export default function CommentForm({
  onSubmit,
  disabled = false,
}: CommentFormProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const text = message.trim();

    if (!text) return;

    await onSubmit(text);

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border bg-white p-4 shadow-sm"
    >
      <textarea
        rows={4}
        value={message}
        disabled={disabled}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un comentario..."
        className="w-full rounded-lg border p-3"
      />

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="rounded-lg bg-rose-600 px-5 py-2 text-white disabled:opacity-50"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}