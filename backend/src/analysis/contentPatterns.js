export function runContentPatterns(posts) {
  const textAll = posts.map((p) => p.text).join(' ');
  const words = textAll
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, '')
    .match(/\b[a-z0-9#]+\b/g) || [];

  const freq = {};
  for (const w of words) {
    if (w.length < 3) continue;
    freq[w] = (freq[w] || 0) + 1;
  }

  const commonWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));

  const averageLength = posts.length
    ? posts.reduce((sum, p) => sum + p.text.length, 0) / posts.length
    : 0;

  const emojiRegex = /[\u{1F300}-\u{1FAFF}]/u;
  const emojiPosts = posts.filter((p) => emojiRegex.test(p.text)).length;
  const linkPosts = posts.filter((p) => /https?:\/\/\S+/.test(p.text)).length;

  return {
    commonWords,
    averageLength,
    emojiUsageRate: posts.length ? emojiPosts / posts.length : 0,
    linkUsageRate: posts.length ? linkPosts / posts.length : 0
  };
}
