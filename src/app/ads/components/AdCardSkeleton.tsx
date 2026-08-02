export default function AdCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="h-56 w-full bg-gray-200" />

      <div className="p-5">
        <div className="mb-3 h-8 w-28 rounded bg-gray-200" />

        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />

        <div className="mb-2 h-4 w-full rounded bg-gray-200" />
        <div className="mb-4 h-4 w-5/6 rounded bg-gray-200" />

        <div className="mb-5 flex flex-wrap gap-2">
          <div className="h-7 w-16 rounded-full bg-gray-200" />
          <div className="h-7 w-20 rounded-full bg-gray-200" />
          <div className="h-7 w-14 rounded-full bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-9 w-24 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}