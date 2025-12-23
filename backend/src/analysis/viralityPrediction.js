export function runViralityPrediction(posts) {
  const postScores = posts.map((p) => {
    const base =
      p.likeCount * 1 +
      p.retweetCount * 3 +
      p.replyCount * 2 +
      p.quoteCount * 2;
    const recencyBoost =
      1 / (1 + (Date.now() - p.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const predictedScore = base * (1 + recencyBoost);

    return { id: p.id, text: p.text, predictedScore };
  });

  const globalScore = postScores.length
    ? postScores.reduce((s, p) => s + p.predictedScore, 0) / postScores.length
    : 0;

  return {
    globalScore,
    postScores: postScores.slice(0, 20)
  };
}
