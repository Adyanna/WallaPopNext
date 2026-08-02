export default function AdDetailSkeleton() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-6 py-10">
      <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">
        <div className="h-[500px] rounded-2xl bg-gray-200" />

        <div className="flex flex-col">
          <div className="mb-4 h-10 w-3/4 rounded bg-gray-200" />

          <div className="mb-8 h-10 w-40 rounded bg-gray-200" />

          <div className="mb-2 h-6 w-32 rounded bg-gray-200" />

          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>

          <div className="my-8 flex gap-3">
            <div className="h-11 w-28 rounded-lg bg-gray-200" />
            <div className="h-11 w-28 rounded-lg bg-gray-200" />
          </div>

          <div className="mb-8">
            <div className="mb-3 h-6 w-28 rounded bg-gray-200" />

            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 rounded-full bg-gray-200" />
              <div className="h-8 w-24 rounded-full bg-gray-200" />
              <div className="h-8 w-16 rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="mt-auto rounded-xl border border-gray-200 p-5">
            <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
            <div className="h-6 w-40 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}