import express from 'express';
import { requireAuth } from './authMiddleware.js';
import { prisma } from '../models/prismaClient.js';
import { xApiClient } from '../config/xClient.js';

export const trendingRouter = express.Router();

/**
 * GET /api/trending
 * Fetch recent tweets as a "trending snapshot" and store them.
 * TODO: Replace with real trending endpoint when available.
 */
trendingRouter.get('/', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const client = xApiClient(user.accessToken);
    const response = await client.get('/tweets/search/recent', {
      params: {
        query: 'lang:en -is:retweet',
        'tweet.fields': 'public_metrics,created_at',
        max_results: 50
      }
    });

    const tweets = response.data.data || [];

    for (const t of tweets) {
      const m = t.public_metrics || {};
      await prisma.post.upsert({
        where: { xPostId: t.id },
        create: {
          xPostId: t.id,
          authorId: user.id,
          text: t.text,
          likeCount: m.like_count || 0,
          retweetCount: m.retweet_count || 0,
          replyCount: m.reply_count || 0,
          quoteCount: m.quote_count || 0,
          createdAt: new Date(t.created_at)
        },
        update: {}
      });
    }

    res.json({ tweets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trending data' });
  }
});
