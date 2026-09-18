/**
 * Resolves a `public/` asset path against Vite's configured `base`.
 *
 * At root (`/`) this is a no-op (`/hero.jpg` stays `/hero.jpg`).
 * On subpath deployments (e.g. GitHub Pages serves the site under
 * `/<repo-name>/`), it becomes `/<repo-name>/hero.jpg` so images resolve
 * instead of 404-ing. `asset("/hero.jpg")` and `asset("hero.jpg")` are
 * equivalent — normalization below handles both shapes.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // "/" by default, "/repo-name/" on Pages
  return base.endsWith("/")
    ? `${base}${path.replace(/^\//, "")}`
    : `${base}/${path.replace(/^\//, "")}`;
}
