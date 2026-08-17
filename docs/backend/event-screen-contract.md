# Backend handoff — Event screen states

This note covers the 13 Figma frames implemented in the event flow:

`90215`, `90330` (hero), `90359`, `90244` (tabs), `90248` (prizes / profile upgrade), `90363`, `90479`, `90595`, `90711` (contestant cards), `90293`, `90827` (FAQ), and `90306`, `90840` (footer variants).

## Routes

| Route | UI state |
| --- | --- |
| `/events/:eventId/overview` | hero, tabs, gallery, description, event sidebar, FAQ |
| `/events/:eventId/prizes` | hero, tabs, placement prize panel, profile upgrade card, FAQ |
| `/events/:eventId/participants` | hero, tabs, four-column contestant card grid, FAQ |

The global navbar and footer are rendered by `src/Layout.jsx`; the event screens must not return a second copy of either.

## Recommended API

`GET /api/events/:eventId/detail`

```json
{
  "id": "1",
  "title": "International Cosplay Contest",
  "status": "upcoming",
  "category": "Game Jam",
  "fee": 250,
  "reward": 1500,
  "currency": "SPCA",
  "startsAt": "2024-04-12T10:00:00Z",
  "endsAt": "2024-04-12T18:00:00Z",
  "venue": "Online",
  "host": { "id": "ezzstar", "name": "Ezzstar", "avatarUrl": "/uploads/ezzstar.png" },
  "prizes": [
    { "place": 1, "amount": 120, "currency": "SPCA" },
    { "place": 2, "amount": 80, "currency": "SPCA" },
    { "place": 3, "amount": 40, "currency": "SPCA" }
  ],
  "gallery": [{ "id": "image-1", "url": "/uploads/contestant-1.png", "alt": "..." }],
  "description": { "html": "<p>...</p>" },
  "contestants": {
    "total": 100,
    "items": [{
      "id": "entry-1",
      "creator": { "id": "user-1", "name": "Saachi Singh", "avatarUrl": "/uploads/saachi.png" },
      "title": "Jinx",
      "game": "League of Legends",
      "imageUrl": "/uploads/jinx.png",
      "votes": 35,
      "createdAt": "2024-04-11T10:00:00Z",
      "hasVoted": false
    }]
  },
  "faqs": [{ "id": "faq-1", "question": "...", "answer": "..." }]
}
```

## Mutations

- `POST /api/events/:eventId/register` — register the current user; return `{ "registered": true }`.
- `POST /api/events/:eventId/entries` — submit a contestant image and metadata; return the created contestant entry.
- `POST /api/events/:eventId/contestants/:entryId/vote` — idempotent vote; return `{ "votes": 36, "hasVoted": true }`.
- `DELETE /api/events/:eventId/contestants/:entryId/vote` — optional vote removal.
- `POST /api/profile/upgrade` — the upgrade button in the profile card should create/checkout a Star Plan subscription.

## Frontend fallback and replacement points

`src/config/figmaEventScreens.js` is intentionally a backend-shaped fallback. During integration, fetch the endpoint in `EventsLayout` (or a Redux/API hook), normalize the response to this shape, and pass it to `FigmaEventDetail`, `FigmaEventPrizes`, and `FigmaContestantGrid`.

The Figma asset URLs currently used by the fallback are short-lived design-export URLs. Production responses should provide durable CDN/storage URLs and the API should own alt text, ordering, timestamps, vote state, and permissions.
