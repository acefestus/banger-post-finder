import express from 'express';
import { requireAuth } from './authMiddleware.js';
import { prisma } from '../models/prismaClient.js';
import { runEngagementAnalysis } from '../analysis/engagementAnalysis.js';
import { runContentPatterns } from '../analysis/contentPatterns.js';
import { runViralityPrediction } from '../analysis/viralityPrediction.js';
import { runSentimentTiming } from '../analysis/sentimentTiming.js';

export const insightsRouter = express.Router();

/**
 * GET /api/insights
 * Combine all analytics for dashboard.
 */
insightsRouter.get('/', requireAuth, async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      take: 500
    });

    const engagement = runEngagementAnalysis(posts);
    const contentPatterns = runContentPatterns(posts);
    const virality = runViralityPrediction(posts);
    const sentimentTiming = runSentimentTiming(posts);

    res.json({
      engagement,
      contentPatterns,
      virality,
      sentimentTiming
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute insights' });
  }
});
