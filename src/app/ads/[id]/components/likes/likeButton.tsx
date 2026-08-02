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
      className="flex items-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="text-xl">
        {optimisticLike.liked ? "❤️" : "🤍"}
      </span>

      <span>{optimisticLike.total}</span>
    </button>
  );
}