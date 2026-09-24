# DrugExplorer Frontend

## Overview

The frontend is a React 18 single-page application created with Create React App. It uses React Router, Axios, custom hooks, React Context, and CSS.

## Structure

```text
src/
  components/   page and reusable UI components
  hooks/        API-backed state and business logic
  services/     Axios client and drug API methods
  types/        response-shape helpers
  context/      shared React context
  styles/       page and component styles
  utils/        helper functions
  App.js        application shell and routes
  index.js      React entry point
```

The main pages are `HomePage`, `SearchPage`, `AnalyticsPage`, and `HistoryPage`. Shared UI includes navigation, loading, error, and success components.

## Routes and backend calls

| Frontend route | Purpose | Backend endpoint |
|---|---|---|
| `/` | Home and feature navigation | none |
| `/search` | Drug search and grouped variants | `GET /api/drugs/search?query=...` |
| `/analytics` | Search and cache metrics | `GET /api/drugs/analytics` |
| `/history` | Search history and filters | history endpoint when available in the API contract |

The service path is `component -> custom hook -> drugAPI -> apiClient -> backend`. Components should not call Axios directly.

## Configuration

Create `.env` in the frontend project root:

```env
REACT_APP_API_URL=http://localhost:5000
```

The API origin should match the backend launch profile and HTTPS/CORS configuration. Do not commit local `.env` files or secrets.

## Development

Run from `DrugExplorer-FE/drugexplorer-fe`:

```powershell
npm install
npm start
npm test
npm run build
```

The development server normally uses `http://localhost:3000`. The backend CORS policy currently allows that origin.

## Conventions

- Keep API calls in `src/services` and reusable request state in hooks.
- Keep page components responsible for composition and presentation, not transport details.
- Represent loading, error, empty, and success states explicitly.
- Keep styles close to their page/component and preserve responsive behavior.
- Update this document when routes, environment variables, API contracts, or major state-management choices change.

## Current scope

The frontend currently focuses on classical search, analytics, and history workflows. Semantic search and RAG endpoints exist in the backend but are not yet frontend features until UI support is added.
