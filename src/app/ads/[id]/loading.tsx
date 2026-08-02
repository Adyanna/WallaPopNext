import AdDetailSkeleton from "./components/AdDetailSkeleton";
import CommentSkeleton from "./components/CommentSkeleton";

export default function Loading() {
  return (
    <main className="space-y-10">
      <AdDetailSkeleton />

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-2xl font-bold">
          Comentarios
        </h2>

        <div className="space-y-4">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </section>
    </main>
  );
}