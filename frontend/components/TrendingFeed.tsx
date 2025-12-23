'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient';

export default function TrendingFeed({ token }: { token: string }) {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    const client = apiClient(token);
    client.get('/api/trending').then((res) => {
      setTweets(res.data.tweets || []);
    });
  }, [token]);

  return (
    <div>
      <h3>Trending Posts Snapshot</h3>
      <ul>
        {tweets.map((t: any) => (
          <li key={t.id} style={{ marginBottom: '1rem' }}>
            <p>{t.text}</p>
            <small>
              Engagement: {JSON.stringify(t.public_metrics || {})}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
