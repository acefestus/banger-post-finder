export function runEngagementAnalysis(posts) {
  if (!posts.length) {
    return { avgLikes: 0, avgRetweets: 0, avgReplies: 0, topPosts: [] };
  }

  let likes = 0, rt = 0, replies = 0;
  const scored = posts.map((p) => {
    const score = p.likeCount + 2 * p.retweetCount + p.replyCount;
    likes += p.likeCount;
    rt += p.retweetCount;
    replies += p.replyCount;
    return { id: p.id, text: p.text, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    avgLikes: likes / posts.length,
    avgRetweets: rt / posts.length,
    avgReplies: replies / posts.length,
    topPosts: scored.slice(0, 5)
  };
}
