import React from 'react';

export default function TimingChart({ timing }: { timing: any }) {
  const buckets = timing.timingBuckets || [];

  return (
    <div>
      <h3>Engagement by Hour</h3>
      {/* TODO: Replace with real chart library if you want */}
      <ul>
        {buckets.map((b: any) => (
          <li key={b.hour}>
            {b.hour}:00 – avg engagement {b.avgEngagement.toFixed(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}
