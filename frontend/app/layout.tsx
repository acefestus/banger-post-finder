import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Banger Post Finder',
  description: 'Find and boost your X banger posts'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
