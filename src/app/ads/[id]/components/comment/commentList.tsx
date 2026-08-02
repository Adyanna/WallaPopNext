"use client";

import type { CommentType } from "@/lib/comments/commentTypes";

import CommentCard from "./commentCard";

type CommentListProps = {
  comments: CommentType[];
};

export default function CommentList({
  comments,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
        Aún no hay comentarios.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}