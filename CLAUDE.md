# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend

```bash
cd backend
pip install -r requirements.txt
python3 -m flask run --port 3001   # runs at http://localhost:3001
```

### Frontend

```bash
cd frontend
cp .env.example .env   # then fill in REACT_APP_HERE_API_KEY
yarn install
yarn start             # dev server at http://localhost:3000
yarn build             # production build
yarn test              # runs Jest tests (watch mode)
yarn test --watchAll=false  # single test run
```

The `.claude/launch.json` is configured for `preview_start` to run both servers — use that when working in Claude Code's preview environment.

## Architecture

This is a **React + Flask** demo app. The frontend fetches all data from the backend on load; there is no client-side mock data.

### Data flow

1. `App.js` reads `?user=0|1|2` from the URL and calls `GET /person/<idx>` via `src/api.js`
2. The backend (`backend/app.py`) looks up the persona in `backend/data.py`, computes absolute ISO timestamps from relative minute offsets (`startOffsetMinutes`) at request time using `datetime.now()`, and returns a single JSON object with `event` (object) and `offers` (array)
3. `App.js` parses ISO strings with `new Date()` — no client-side time math — and passes `event` down to `NextEvent` and `offers` down to `OfferList`

**Why offsets instead of hardcoded times**: so the demo always shows realistic, current-looking times regardless of when the server is started.

### Frontend component tree

```
App
├── ConfirmModal          (react-modal booking summary overlay)
├── NextEvent             (calendar strip showing the upcoming event)
└── OfferList             (react-swipeable-views carousel of transport options)
     └── EventOverview    (one swipe card per offer)
          └── Map         (HERE Maps JS SDK v3.1, imperative init via useRef)
```

### HERE Maps integration

The SDK is loaded as **synchronous CDN scripts** in `public/index.html` (before React), making `window.H` available globally. `map.js` uses `useRef` + `useEffect` to initialise the map imperatively. Auth uses a single `apikey` (new HERE v3.1 format — **not** the legacy `appId`/`appCode`). The routing service is v8: `platform.getRoutingService(null, 8)`. Polylines use `H.geo.LineString.fromFlexiblePolyline()`.

To prevent the swipeable card from capturing touch events on the map, the `<Map>` is wrapped in a `div` with `onTouchStart`/`onMouseDown` calling `e.stopPropagation()` and `style={{ display: 'contents' }}`.

### Key files

| File | Purpose |
|------|---------|
| `backend/data.py` | All mock personas and offer definitions (minute offsets, coordinates) |
| `backend/app.py` | Single route `GET /person/<idx>` — converts offsets to ISO times |
| `frontend/src/api.js` | Thin fetch wrapper; reads `REACT_APP_API_URL` |
| `frontend/src/constants.js` | `BRAND_COLOR` (`#ff5f00`) used across components |
| `frontend/src/utils.js` | `timeToString`, `timeInMinutes`, `hourToString`, `getUrlParameter` |

### Environment variables

`frontend/.env` (copy from `.env.example`):
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_HERE_API_KEY=<key from developer.here.com>
```

The HERE API key needs **JavaScript Maps** and **Routing API v8** access. Without it, `map.js` renders a placeholder instead of crashing.

### Demo personas (`?user=`)

| `?user=` | Persona | Scenario |
|----------|---------|---------|
| `0` | Microsoft Developer | On time — passenger in shared car |
| `1` | TUM Student | On time — driving own shared car |
| `2` | LMU Student | Running late — event starts before ride arrives |

"Late" is detected in `EventOverview` when `event.startTime - offer.endTime < 0`.

## Git Workflow

- Branch naming: `feature/description`, `fix/description`
- Conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Always branch from `main`, never commit directly to `main`
