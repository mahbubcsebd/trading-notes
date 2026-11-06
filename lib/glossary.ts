/** DOM id of a glossary term row. Shared by GlossaryExplorer and site search. */
export const glossaryAnchorId = (term: string): string =>
  `term-${term
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")}`;

/** URL-safe hash fragment (without `#`) pointing at a glossary term row. */
export const glossaryAnchorHash = (term: string): string =>
  encodeURIComponent(glossaryAnchorId(term));
