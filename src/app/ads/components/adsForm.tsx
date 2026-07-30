"use client";

import { useActionState } from "react";
import { AdsState } from "@/lib/ads/adsTypes";

type AdFormProps = {
  action: (
    previousState: AdsState,
    formData: FormData,
  ) => Promise<AdsState>;

  initialValues?: AdsState["values"];
   id?: number;
  submitText: string;
};

const initialState: AdsState = {
  success: false,
  values: {
    title: "",
    description: "",
    price: "",
    tags: [],
  },
  errors: {},
};

export default function AdsForm({
  action,
  initialValues,
  id,
  submitText,
}: AdFormProps) {

    const [state, formAction, pending] = useActionState( action,initialState,);

    return (
    <form action={formAction}  className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-rose-700">
            {submitText}
        </h1>
        {id && ( <input type="hidden" name="id" value={id}/>
        )}
        <div>
            <label htmlFor="title"className="mb-2 block font-medium text-rose-700">
                Título
            </label>

            <input id="title" name="title" defaultValue={state.values.title || initialValues?.title || ""}
                className="w-full rounded-lg border border-pink-300 px-4 py-2 focus:border-rose-500 focus:outline-none"/>

            {state.errors.title?.map((error) => (<p key={error} className="mt-1 text-sm text-red-500"> {error} </p>))}
        </div>
        <div>
            <label htmlFor="description" className="mb-2 block font-medium text-rose-700" >
                Descripción
            </label>

            <textarea id="description" name="description" rows={5}
                defaultValue={state.values.description || initialValues?.description || ""}
                className="w-full rounded-lg border border-pink-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
            />

            {state.errors.description?.map((error) => (<p key={error} className="mt-1 text-sm text-red-500" > {error}</p>))}
        </div>
        <div>
            <label htmlFor="price" className="mb-2 block font-medium text-rose-700">
                Precio (€)
            </label>

            <input id="price" name="price" type="number" step="0.01"
                defaultValue={state.values.price ||initialValues?.price ||""
                }
                className="w-full rounded-lg border border-pink-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
            />

            {state.errors.price?.map((error) => (<p key={error} className="mt-1 text-sm text-red-500">{error}</p>))}
        </div>
        <div>
            <label htmlFor="imageUrl" className="mb-2 block font-medium text-rose-700">
                Imagen
            </label>

            <input id="image" name="image" type="file" accept="image/*"
               className="w-full rounded-lg border border-pink-300 px-4 py-2 file:mr-4 file:rounded-lg file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-rose-600"
            />

            {state.errors.image?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-500" >{error}</p>
            ))}
        </div>
        <div>
            <label className="mb-3 block font-medium text-rose-700">
                Categorías
            </label>

            <div className="grid grid-cols-2 gap-3 rounded-lg border border-pink-300 p-4">
                {["ELECTRONICS","HOME","FASHION","SPORTS","BOOKS","TOYS","VEHICLES","SERVICES","PETS","OTHERS",].map((tag) => (
                <label key={tag}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition hover:bg-pink-100">
                    <input type="checkbox" name="tags" value={tag}
                    defaultChecked={state.values.tags.includes(tag) ||initialValues?.tags.includes(tag)} className="h-4 w-4 accent-rose-500"/>

                    <span className="text-sm text-gray-700">
                    {tag}
                    </span>
                </label>
                ))}
            </div>

            {state.errors.tags?.map((error) => (<p key={error}className="mt-2 text-sm text-red-500">{error}</p>))}
            </div>
        <div className="pt-4">
            <button type="submit" disabled={pending}
                className="w-full rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-pink-500 hover:to-rose-600 disabled:cursor-not-allowed disabled:opacity-60">
                {pending ? "Guardando..." : submitText}
            </button>
        </div>
        
    </form>
    );
}