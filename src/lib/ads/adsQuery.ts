export type SearchParamValue = string | string[] | undefined;

export type AdsQuery = {
  query: string;
  tag: string;
  order: "asc" | "desc";
  page: number;
};

export const ADS_PAGE_SIZE = 6;
const PRISMA_INT_MAX = 2_147_483_647;

function first(value: SearchParamValue): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export function parseAdsQuery(
  searchParams: Record<string, SearchParamValue>,
): AdsQuery {
  const query = first(searchParams.query);
  const tag = first(searchParams.tag);
  const order = first(searchParams.order);
  const page = Number(first(searchParams.page));

  return {
    query,
    tag,
    order: order === "asc" || order === "desc" ? order : "desc",
    page: page < 1 ? 1 : page,
  };
}

function adsQueryParams(input: AdsQuery, page: number) {
  const params = new URLSearchParams();

  if (input.query) params.set("query", input.query);
  if (input.order !== "desc") params.set("order", input.order);
  if (page > 1) params.set("page", String(page));

  return params;
}

export function adsListHref(input: AdsQuery, page = input.page): string {
  const queryString = adsQueryParams(input, page).toString();
  return queryString ? `/ads?${queryString}` : "/ads";
}

export function parseAdsId(value: unknown): number | null {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id <= PRISMA_INT_MAX ? id : null;
}
