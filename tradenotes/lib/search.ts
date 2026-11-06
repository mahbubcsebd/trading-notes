export type SearchItem = {
  title: string;
  kind: "Page" | "Chapter" | "Lesson" | "Pattern" | "Glossary" | "Note";
  href: string;
  hint?: string;
};
