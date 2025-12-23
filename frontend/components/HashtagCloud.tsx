import React from 'react';

export default function HashtagCloud({ patterns }: { patterns: any }) {
  const tags = patterns.commonWords || [];

  return (
    <div>
      <h3>Top Hashtags / Keywords</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map((t: any) => (
          <span
            key={t.word}
            style={{
              fontSize: `${10 + t.count}px`,
              border: '1px solid #ddd',
              padding: '0.2rem 0.4rem',
              borderRadius: '999px'
            }}
          >
            {t.word}
          </span>
        ))}
      </div>
    </div>
  );
}
