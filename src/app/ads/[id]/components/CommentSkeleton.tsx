export default function CommentSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full bg-gray-200" />

        <div className="flex-1">
          {/* Usuario y fecha */}
          <div className="mb-3 flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>

          {/* Comentario */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}