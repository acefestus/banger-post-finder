export function runSentimentTiming(posts) {
  const buckets = {};

  for (const p of posts) {
    const hour = p.createdAt.getHours();
    const engagement =
      p.likeCount + 2 * p.retweetCount + p.replyCount + p.quoteCount;

    if (!buckets[hour]) buckets[hour] = { total: 0, count: 0 };
    buckets[hour].total += engagement;
    buckets[hour].count += 1;
  }

  const timingBuckets = Object.entries(buckets).map(([hour, data]) => ({
    hour: Number(hour),
    avgEngagement: data.total / data.count
  }));

  timingBuckets.sort((a, b) => b.avgEngagement - a.avgEngagement);
  const bestHoursToPost = timingBuckets.slice(0, 3).map((b) => b.hour);

  return {
    bestHoursToPost,
    timingBuckets,
    avgSentiment: 0 // placeholder until you add real sentiment scoring
  };
}
