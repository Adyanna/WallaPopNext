import AdCardSkeleton from "./components/AdCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <div className="mb-3 h-12 w-80 animate-pulse rounded bg-gray-200" />

        <div className="h-5 w-96 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <AdCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}