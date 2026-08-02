type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
      <div className="mb-4 text-6xl">📦</div>

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        {description}
      </p>
    </div>
  );
}