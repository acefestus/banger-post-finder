'use client';

export default function HomePage() {
  const handleLogin = () => {
    // Redirect to backend OAuth login
    window.location.href = 'http://localhost:4000/auth/x/login';
    // In production, replace with your Railway backend URL
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <h1>Banger Post Finder & Engagement Booster</h1>
        <p>
          Connect your X account to analyze your content, spot bangers, and
          boost your reach.
        </p>
        <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>
          Sign in with X
        </button>
      </div>
    </main>
  );
}
