# Backend Integration — Manga Search / Browse Page

> **Audience:** the backend developer taking over after the frontend build.
> **Screen:** Figma node `8475-96611` (EzzStar "Search" / browse page).
> **Route:** `/manga/search`
> **Files:**
> - [`src/components/manga/MangaSearchPage.jsx`](../../src/components/manga/MangaSearchPage.jsx) — the page
> - [`src/components/manga/search/MangaPosterCard.jsx`](../../src/components/manga/search/MangaPosterCard.jsx) — the card
> - [`src/App.jsx`](../../src/App.jsx) — the route (`manga/search`, declared **before** `Manga/:id`)

The Navbar and Footer are **not** part of this page — they come from the global `Layout.jsx`. This page renders only its own content.

---

## TL;DR — what's real vs. what you need to wire up

| Piece | State today | What you need to do |
| --- | --- | --- |
| Card grid data | ✅ Real — uses existing `fetchManga` thunk (`GET /api/manga/top10`) | Nothing required. Optionally swap to a search endpoint (below). |
| Dev fallback (`mockMangas`) | ⚠️ Shows only when the API errors | Leave as-is; disappears automatically once the API responds. |
| Search text box | 🔴 Placeholder — filters client-side | Add `GET /api/manga/search` and remove the client filter. |
| Genre dropdown | 🔴 Placeholder — hardcoded list | Add `GET /api/manga/genres`. |
| Author dropdown | 🔴 Placeholder — hardcoded list | Add `GET /api/manga/authors`. |
| Category sections | 🔴 Placeholder — 5× `{Category name}`, all show the same list | Decide how results are grouped; return titled sections. |
| `boosted` flag on cards | 🔴 Placeholder — always `false` | Return a boolean per manga so boosted items get the glow + rocket. |
| Heart / favourite | 🔴 Local UI state only | Add a favourite/like endpoint if this should persist. |

Anything marked `PLACEHOLDER` in the source is listed here.

---

## 1. Data contract that MUST be preserved

The grid is fed by the **existing** `fetchManga` thunk in [`src/store/slices/mangaSlice.js`](../../src/store/slices/mangaSlice.js). **Do not change its shape** — other screens (Home, Manga landing) depend on it.

**Endpoint:** `GET ${VITE_API_URL}/api/manga/top10`

**Expected response:**
```json
{
  "data": [
    {
      "id": "…",
      "isPlatform": true,
      "coverUrl": "https://… or /uploads/…",
      "attributes": {
        "title":       { "en": "Neon Ronin" },
        "description": { "en": "…" },
        "tags": [
          { "attributes": { "group": "genre", "name": { "en": "Action" } } }
        ]
      },
      "relationships": [
        { "type": "author", "attributes": { "name": "K. Tanaka" } }
      ]
    }
  ]
}
```

The thunk normalizes each item to this flat shape, which is what the card consumes:
```js
{ id, imageUrl, title, author, genre, description, isPlatform }
```
- `isPlatform: true`  → platform-hosted manga.
- `isPlatform: false` → external (MangaDex-style) manga.

**Cover URLs:** the card's `resolveCover()` helper passes `http(s)://` and `data:` URLs through untouched, and prepends `VITE_API_URL` to relative paths (e.g. `/uploads/x.jpg`). So either absolute or relative cover paths work.

---

## 2. Placeholders to replace

### 2a. Search box → `GET /api/manga/search`
Right now typing filters the already-loaded list **client-side** (title/author substring). This is dev-only.

```
GET /api/manga/search?q=<text>&genre=<genre>&author=<author>
→ { "data": [ …same item shape as /api/manga/top10… ] }
```
When this exists: call it (debounced) on input/dropdown change and **delete** the `filtered` `useMemo` in `MangaSearchPage.jsx`.

### 2b. Genre dropdown → `GET /api/manga/genres`
Currently a hardcoded `PLACEHOLDER_GENRES` array (Action, Adventure, …).
```
GET /api/manga/genres
→ { "data": ["Action", "Adventure", "Comedy", …] }
```

### 2c. Author dropdown → `GET /api/manga/authors`
Currently a hardcoded `PLACEHOLDER_AUTHORS` array.
```
GET /api/manga/authors
→ { "data": ["Aaron Campbell", "H.G. Wells", …] }
```

### 2d. Category sections
The design shows 5 repeated `{Category name}` headers, each over a 4-column poster grid. Today all 5 render the **same** filtered list — purely to fill the layout.

Decide how you want to group results (trending, by genre, newest, editorial rows, etc.) and return titled sections, e.g.:
```json
{
  "sections": [
    { "title": "Trending Now", "items": [ …item shape… ] },
    { "title": "New Releases", "items": [ … ] }
  ]
}
```
Then map over `sections` instead of `PLACEHOLDER_CATEGORIES`.

### 2e. `boosted` flag
The card renders a yellow glow ring + rocket icon when `boosted` is `true`. Add a boolean to each manga item:
```json
{ "id": "…", "boosted": true }
```
The card already reads `manga.boosted` (defaults to `false`).

### 2f. Favourite (heart)
The heart is **local component state only** — it does not persist. If favourites should be saved, add e.g. `POST /api/manga/:id/favourite` / `DELETE` and wire it into the card's toggle (`setLiked`).

---

## 3. Navigation

Clicking a card navigates to:
```
/manga/:id?source=<platform|mangadex|jikan|zyla>
```
`source` is derived from `isPlatform` (`platform` if true, else the item's `source`, default `mangadex`). `MangaDetails.jsx` reads this via `useSearchParams` to pick the right detail/chapter endpoints — so make sure the `source` you imply here matches what the detail page expects.

---

## 4. Env

Set `VITE_API_URL` in `.env` to the API base (no trailing slash), e.g.:
```
VITE_API_URL=http://localhost:5000
```
When unset or unreachable, the page falls back to `mockMangas` so the UI stays styled during development.
