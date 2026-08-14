/** Prefix public asset paths for Vite `base` (GitHub Pages project sites). */
export function asset(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
