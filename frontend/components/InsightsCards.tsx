import React from 'react';

export default function InsightsCards({ insights }: { insights: any }) {
  const { engagement, contentPatterns, virality, sentimentTiming } = insights;
  const bestHours = sentimentTiming.bestHoursToPost || [];

  return (
    <section
      style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ border: '1px solid #ccc', padding: '1rem', flex: 1 }}>
        <h3>Best Time to Post</h3>
        <p>
          Top hours:{' '}
          {bestHours.length ? bestHours.join(', ') : 'Not enough data yet'}
        </p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '1rem', flex: 1 }}>
        <h3>Average Engagement</h3>
        <p>Likes: {engagement.avgLikes.toFixed(1)}</p>
        <p>Retweets: {engagement.avgRetweets.toFixed(1)}</p>
        <p>Replies: {engagement.avgReplies.toFixed(1)}</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '1rem', flex: 1 }}>
        <h3>Virality Score</h3>
        <p>Overall: {virality.globalScore.toFixed(1)}</p>
        <p>Top Post Preview:</p>
        <small>
          {virality.postScores[0]?.text?.slice(0, 100) || 'No posts yet'}
        </small>
      </div>
    </section>
  );
}
