# Banger Post Finder & Engagement Booster

Analyze your X (Twitter) content, find banger posts, and boost engagement with timing, hashtags, and virality insights.

## Tech Stack

- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: Next.js (App Router)
- Auth: X (Twitter) OAuth 2.0 (user login)
- Deployment: Railway (single service), PostgreSQL via Railway or Supabase

## Monorepo Structure

- `backend/` – API, OAuth, analytics, DB
- `frontend/` – Next.js dashboard

## Setup

1. Clone repo or create it on GitHub and add these files.
2. Copy `.env.example` → `.env` and fill:

   - `X_CLIENT_ID`
   - `X_CLIENT_SECRET`
   - `X_REDIRECT_URI`
   - `JWT_SECRET`
   - `DATABASE_URL`
   - `FRONTEND_URL`

3. Install dependencies (from repo root):

   ```bash
   npm install
   cd backend
   npx prisma generate
   npx prisma migrate deploy
