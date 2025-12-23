import 'dotenv/config';

export const env = {
  xClientId: process.env.X_CLIENT_ID,
  xClientSecret: process.env.X_CLIENT_SECRET,
  xRedirectUri: process.env.X_REDIRECT_URI,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  xApiBaseUrl: process.env.X_API_BASE_URL || 'https://api.x.com/2',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
