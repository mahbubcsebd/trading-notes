/** Lesson ids look like "01-what-is-forex" (chapter number + lesson slug). Safe to use on server and client. */
export function lessonId(chapterN: number, slug: string) {
  return `${String(chapterN).padStart(2, "0")}-${slug}`;
}
