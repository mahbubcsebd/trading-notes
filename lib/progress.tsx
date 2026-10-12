/**
 * Progress tracking using localStorage.
 * All functions are no-ops in SSR context.
 */

const PREFIX = 'tradenotes:';

function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Mark a lesson as complete.
 * @param {string} slug - lesson slug (e.g. "01-foundations/03-pips-lots")
 */
export function markComplete(slug) {
  if (!isBrowser()) return;
  const completed = getCompleted();
  completed.add(slug);
  localStorage.setItem(`${PREFIX}completed`, JSON.stringify([...completed]));
}

/**
 * Remove completion mark from a lesson.
 * @param {string} slug
 */
export function markIncomplete(slug) {
  if (!isBrowser()) return;
  const completed = getCompleted();
  completed.delete(slug);
  localStorage.setItem(`${PREFIX}completed`, JSON.stringify([...completed]));
}

/**
 * Check if a lesson is completed.
 * @param {string} slug
 * @returns {boolean}
 */
export function isCompleted(slug) {
  if (!isBrowser()) return false;
  return getCompleted().has(slug);
}

/**
 * Get all completed lesson slugs as a Set.
 * @returns {Set<string>}
 */
export function getCompleted() {
  if (!isBrowser()) return new Set();
  try {
    const raw = localStorage.getItem(`${PREFIX}completed`);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

/**
 * Calculate progress percentage for a module.
 * @param {string[]} slugs - all slugs in the module
 * @returns {number} 0-100
 */
export function moduleProgress(slugs) {
  if (!slugs.length) return 0;
  const completed = getCompleted();
  const count = slugs.filter((s) => completed.has(s)).length;
  return Math.round((count / slugs.length) * 100);
}

/**
 * Save the last visited lesson.
 * @param {string} slug
 * @param {string} title
 */
export function saveLastVisited(slug, title) {
  if (!isBrowser()) return;
  localStorage.setItem(`${PREFIX}last`, JSON.stringify({ slug, title, ts: Date.now() }));
}

/**
 * Get the last visited lesson.
 * @returns {{ slug: string, title: string, ts: number } | null}
 */
export function getLastVisited() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(`${PREFIX}last`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
