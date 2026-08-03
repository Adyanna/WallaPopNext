import { notFound } from "next/navigation";
import Image from "next/image";
import { getAdById } from "@/lib/ads/adsRepository";
import { getSession } from "@/lib/auth/auth";
import ConfirmModal from "./components/confirmModal";
import CommentsSection from "./components/comment/commentSection";
import { getCommentsByAd } from "@/lib/comments/commentsRepository";
import LikeButton from "./components/likes/likeButton";
import { Metadata } from "next";
import {
  countLikes,
  userLikedAd,
} from "@/lib/likes/likesRepository";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const ad = await getAdById(Number(id));

  if (!ad) {
    return {
      title: "Anuncio no encontrado",
      description: "El anuncio solicitado no existe.",
    };
  }

  return {
    title: ad.title,
    description: ad.description.slice(0, 25),
  };
}

export default async function AdDetailPage({ params}: Props) {
  const { id } = await params;
  const session = await getSession();
  const ad = await getAdById(Number(id));

  if (!ad) {
    notFound();
  }
  const likes = await countLikes(ad.id);
  const liked = session? await userLikedAd(ad.id, session.userId): false;
  const comments = await getCommentsByAd(ad.id);

 return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-gray-100">
          <Image
            src={ad.imageUrl || "/images/no-image.png"}
            alt={ad.title}
            width={700}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {ad.title}
          </h1>

          <p className="mb-6 text-4xl font-extrabold text-rose-600">
            ${Number(ad.price).toFixed(2)}
          </p>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">
              Descripción
            </h2>

            <p className="leading-7 text-gray-700">
              {ad.description}
            </p>
          </div>
          {session?.userId === ad.ownerId && (
            <div className="mb-8 flex gap-3">
              <ConfirmModal id={ad.id}/>
            </div>
            )}

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-semibold">
              Categorías
            </h2>

            <div className="flex flex-wrap gap-2">
              {ad.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <LikeButton
              adId={ad.id}
              initialLiked={liked}
              initialTotal={likes}
              canLike={!!session}
            />
          <div className="mt-auto rounded-xl border border-rose-200 bg-rose-50 p-5">
            <p className="text-sm text-gray-500">
              Publicado por
            </p>

            <p className="text-lg font-semibold">
              {ad.owner.username}
            </p>

          </div>
        </div>
      </div>
      <CommentsSection
        adId={ad.id}
        comments={comments}
        currentUser={session?{
          id: session.userId,
          username: session.username,
        }:null}
      />
    </main>
  );
}
