import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";

type AdCardProps = {
  ad: Prisma.AdGetPayload<{
    include: {
      owner: {
        select: {
          username: true;
        };
      };
    };
  }>;
};

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ads/${ad.id}`}>
      <article className="group overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
          {ad.imageUrl ? (
            <Image
              src={ad.imageUrl}
              alt={ad.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl">
              🌸
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h2 className="line-clamp-1 text-xl font-bold text-rose-700 transition group-hover:text-pink-600">
              {ad.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
              {ad.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-pink-600">
              ${ad.price.toNumber().toFixed(2)}
            </span>

            <span className="rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold text-rose-700 shadow-sm">
              @{ad.owner.username}
            </span>
          </div>

          {ad.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {ad.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}