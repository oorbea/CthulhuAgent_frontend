# Cthulhu Chat Frontend

React + TypeScript single-page chat UI that streams assistant replies over Server-Sent Events (AG-UI protocol). The frontend stays free of secrets; it just posts to your FastAPI backend at `/api/query/ag-ui` and renders deltas as they arrive.

## Environment
- `VITE_API_BASE_URL` (default `/api`). Frontend should never store private keys.

## Development
- `npm install`
- `npm run dev`
- Backend should be at `http://localhost:8000`; Vite proxies `/api` there (see `vite.config.ts`).

## Production (Docker)
- `docker compose up --build`
- App served at `http://localhost:8080` via Nginx, which also proxies `/api` to `backend:8000` with SSE buffering disabled.
