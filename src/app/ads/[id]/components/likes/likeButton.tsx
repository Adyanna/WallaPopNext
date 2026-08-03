"use client";

import { useOptimistic, useTransition } from "react";

import { toggleLikeAction } from "@/app/ads/[id]/actions";

type LikeButtonProps = {
  adId: number;
  initialLiked: boolean;
  initialTotal: number;
  canLike: boolean;
};

type OptimisticLike = {
  liked: boolean;
  total: number;
};

type LikeAction = "toggle";
export default function LikeButton({
  adId,
  initialLiked,
  initialTotal,
  canLike,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [optimisticLike, setOptimisticLike] =
    useOptimistic<OptimisticLike,LikeAction>(
      {
        liked: initialLiked,
        total: initialTotal,
      },
      (state) => ({
        liked: !state.liked,
        total: state.liked
          ? state.total - 1
          : state.total + 1,
      }),
    );

  async function handleLike() {
    if (!canLike) {
      return;
    }

    startTransition(async () => {
      setOptimisticLike("toggle");

      await toggleLikeAction(adId);
    });
  }

  return (
    <button
      type="button"
      disabled={!canLike || isPending}
      onClick={handleLike}
      className="group flex items-center gap-2 rounded-full border border-rose-200 bg-white px-5 py-2 shadow-sm transition hover:border-rose-400 hover:shadow-md disabled:opacity-50"
    >
    <span  className={`text-2xl transition-transform duration-200 
      ${optimisticLike.liked? "scale-110": "group-hover:scale-110"}`}>{optimisticLike.liked ? "❤️" : "🤍"}
    </span>

    <span className="font-semibold text-gray-700">{optimisticLike.total}</span>
    </button>
  );
}