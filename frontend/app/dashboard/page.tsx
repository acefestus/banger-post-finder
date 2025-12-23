'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import InsightsCards from '../../components/InsightsCards';
import TimingChart from '../../components/TimingChart';
import HashtagCloud from '../../components/HashtagCloud';
import TrendingFeed from '../../components/TrendingFeed';

interface InsightsResponse {
  engagement: any;
  contentPatterns: any;
  virality: any;
  sentimentTiming: any;
}

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [insights, setInsights] = useState<InsightsResponse | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/token=([^&]+)/);
    if (match) {
      const t = decodeURIComponent(match[1]);
      window.localStorage.setItem('jwt', t);
      window.location.hash = '';
      setToken(t);
    } else {
      const stored = window.localStorage.getItem('jwt');
      if (stored) setToken(stored);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const client = apiClient(token);
    client.get('/api/insights').then((res) => {
      setInsights(res.data);
    });
  }, [token]);

  if (!token) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>
        <p>Please sign in through the home page first.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your X Banger Post Dashboard</h1>

      {insights && (
        <>
          <InsightsCards insights={insights} />
          <section
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ flex: 2 }}>
              <TimingChart timing={insights.sentimentTiming} />
            </div>
            <div style={{ flex: 1 }}>
              <HashtagCloud patterns={insights.contentPatterns} />
            </div>
          </section>
        </>
      )}

      <section style={{ marginTop: '3rem' }}>
        <TrendingFeed token={token} />
      </section>
    </main>
  );
}
