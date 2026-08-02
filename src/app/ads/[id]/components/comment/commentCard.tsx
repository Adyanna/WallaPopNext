"use client";

import type { CommentType } from "@/lib/comments/commentTypes";

type CommentCardProps = {
  comment: CommentType;
};

export default function CommentCard({
  comment,
}: CommentCardProps) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">
          @{comment.user.username}
        </span>

        <span className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="text-gray-700">
        {comment.message}
      </p>
    </article>
  );
}