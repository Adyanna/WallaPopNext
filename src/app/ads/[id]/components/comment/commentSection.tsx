"use client";

import { useOptimistic, useTransition } from "react";

import type { CommentType } from "@/lib/comments/commentTypes";

import { createCommentAction } from "../../actions";

import CommentForm from "./commentForm";
import CommentList from "./commentList";

type CommentsSectionProps = {
  adId: number;
  comments: CommentType[];
  currentUser?: {
    id: number;
    username: string;
  } | null;
};

export default function CommentsSection({
  adId,
  comments,
  currentUser,
}: CommentsSectionProps) {
  const [isPending, startTransition] = useTransition();

  const [optimisticComments, addOptimisticComment] =
    useOptimistic(
      comments,
      (
        state: CommentType[],
        optimisticComment: CommentType,
      ) => [optimisticComment, ...state],
    );

  async function handleCreateComment(message: string) {
    if (!currentUser) {
      return;
    }

    startTransition(async () => {
      addOptimisticComment({
        id: `temp-${Date.now()}`,
        message,
        createdAt: new Date(),
        user: currentUser,
      });

      const formData = new FormData();

      formData.append("adId", String(adId));
      formData.append("message", message);

      await createCommentAction(formData);
    });
  }

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold">
        Comentarios
      </h2>

      {currentUser ? (
        <CommentForm
          onSubmit={handleCreateComment}
          disabled={isPending}
        />
      ) : (
        <div className="mb-8 rounded-xl border border-dashed p-6 text-center text-gray-500">
          Debes iniciar sesión para comentar.
        </div>
      )}

      <CommentList comments={optimisticComments} />
    </section>
  );
}