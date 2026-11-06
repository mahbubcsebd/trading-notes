export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Group = "foundations" | "strategy" | "mastery";

/* Lesson body blocks. **double asterisks** inside text render as bold. */
export type Block =
  | { t: "p"; text: string }
  | { t: "def"; text: string }
  | { t: "note"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "fig"; id: FigureId; caption?: string }
  | { t: "table"; head: string[]; rows: string[][] };

export type FigureId = "pips" | "sessions" | "anatomy";

export type Section = { id: string; title: string; blocks: Block[] };

export type QuizItem = {
  q: string;
  options: string[];
  answer: number; // index into options
  why: string;
};

export type LessonBody = {
  sections: Section[];
  quiz: QuizItem[];
};

export type Lesson = {
  n: number; // 1-based within the chapter
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  level: Level;
  takeaways: string[];
};

export type Chapter = {
  n: number;
  slug: string;
  group: Group;
  title: string; // short name used in lists
  headline: string; // long title on the chapter page
  summary: string;
  level: Level;
  lessons: Lesson[];
};
