"use client";

import { useRef, useState } from "react";

import ConfirmDialog from "@/app/components/confirmDialog";
import { deleteAdAction } from "../actions";

type Props = {
  id: number;
};

export default function ConfirmModal({ id }: Props) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
        <a
            href={`/ads/${id}/edit`}
            className="rounded-lg bg-rose-500 px-5 py-2 font-medium text-white transition hover:bg-rose-600"
        >
            ✏️ Editar
        </a>

        <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-red-500 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50"
        >
            🗑️ Eliminar
        </button>

        <form ref={formRef} action={deleteAdAction}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDialog
                open={open}
                title="Eliminar anuncio"
                message="¿Estás seguro de eliminar este anuncio? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onCancel={() => setOpen(false)}
                onConfirm={() => formRef.current?.requestSubmit()}
            />
        </form>
    </>
  );
}