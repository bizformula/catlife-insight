# Catlife Insight dual theme

- The only color themes are **brown** (soft brown) and **blue** (previous fresh blue).
- To change, edit `app/layout.tsx` HTML attribute to `data-season="brown"` or `data-season="blue"`.
- Both light palettes and their dark-mode overrides live in `app/globals.css`.
- Leave post/product titles and body copy in `--foreground` (black on light surfaces).
- Use `--point`, `--point-hover`, `--point-soft` for seasonal accents, and `--border`, `--background`, `--card` for surfaces.
- This package does not contain `app/category/[name]/page.tsx` since that file has not been uploaded. Please provide it for conversion.
- Verify locally with `npm run dev`, then `npm run build:vinext` before deployment.
