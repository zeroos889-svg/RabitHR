Rabit HQ
========

Rabit HQ is the internal command center + investor portal that sits on top of the RabitHR platform. It now ships with a polished UI, heuristics-driven fallbacks, and safer defaults so the experience holds up even when infrastructure is offline.

Highlights
----------

- **Guided dashboard** – Burn runway, monthly trend bars, AI/heuristic insights, and system status tiles powered by `lib/finance` + `lib/ai`.
- **Investor snapshot** – Read-only roadmap timeline with graceful fallback data whenever Prisma cannot reach the database.
- **Modern design system** – Custom CSS tokens (no Tailwind dependency) with reusable layout, pill, grid, and card patterns.
- **Resilient services** – `calculateFinancials` now returns source metadata, lookback history, and placeholder datasets to keep builds stable.
- **Improved auth UX** – Split sign-in experience with contextual demo credentials and clearer copy.

Quick start
-----------

1. Copy `.env.example` → `.env` and populate `DATABASE_URL`, `NEXTAUTH_SECRET`, and optional `OPENAI_API_KEY`.
2. Install dependencies & generate Prisma client:

   ```bash
   cd rabit-hq
   npm install
   npx prisma generate
   ```

3. (Optional) seed demo records: `node prisma/seed.js`
4. Run the dev server: `npm run dev`

Testing
-------

Vitest is configured for lightweight snapshots:

```bash
npm test
```

The finance test now validates the richer snapshot contract (fields, fallbacks, and status metadata).

Feature toggles
---------------

- `FEATURE_ENABLE_AI`: opt-in to OpenAI-backed insights. Without the key the dashboard falls back to heuristics.
- `FEATURE_ENABLE_INVESTOR`: disables the investor route entirely (a friendly explainer is shown instead).

For a deeper dive into architecture and data models see `docs/ARCHITECTURE.md`.
