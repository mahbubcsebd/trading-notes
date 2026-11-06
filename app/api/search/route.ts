import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { DEFAULT_RESULT_LIMIT, search } from "@/lib/search/engine";
import { getSearchIndex, isSearchLanguage } from "@/lib/search/documents";

const MAX_QUERY_LENGTH = 100;
const MAX_LIMIT = 20;

const querySchema = z.object({
  q: z.string().trim().max(MAX_QUERY_LENGTH),
  lang: z.string().refine(isSearchLanguage, "Unsupported language"),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_LIMIT)
    .default(DEFAULT_RESULT_LIMIT),
});

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const parsed = querySchema.safeParse({
    q: params.get("q") ?? "",
    lang: params.get("lang") ?? "",
    limit: params.get("limit") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid search parameters" },
      { status: 400 },
    );
  }

  const { q, lang, limit } = parsed.data;
  try {
    const results = q ? search(getSearchIndex(lang), q, limit) : [];
    return NextResponse.json(
      { results },
      // Content only changes on deploy, so identical queries are safe to cache.
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=86400" } },
    );
  } catch (error) {
    console.error("[search] failed", { q, lang, error });
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
