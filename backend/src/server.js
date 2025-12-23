import express from 'express';
import cors from 'cors';
import { xAuthRouter } from './auth/xOAuthRoutes.js';
import { trendingRouter } from './api/trendingRoutes.js';
import { insightsRouter } from './api/userInsightsRoutes.js';
import { env } from './config/env.js';

const app = express();
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
);
app.use(express.json());

app.use('/auth/x', xAuthRouter);
app.use('/api/trending', trendingRouter);
app.use('/api/insights', insightsRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
