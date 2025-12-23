import axios from 'axios';
import jwt from 'jsonwebtoken';
import { prisma } from '../models/prismaClient.js';
import { env } from '../config/env.js';

/**
 * Build X OAuth authorization URL.
 * NOTE: Replace scopes based on your app's needs.
 */
export function getXAuthUrl(state) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.xClientId,
    redirect_uri: env.xRedirectUri,
    scope: 'tweet.read users.read offline.access',
    state,
    code_challenge: 'dummy_challenge', // TODO: Implement real PKCE
    code_challenge_method: 'plain'
  });

  return `https://api.x.com/oauth2/authorize?${params.toString()}`;
}

/**
 * Exchange OAuth 'code' for access/refresh tokens.
 * NOTE: Confirm exact endpoint/fields with X API docs.
 */
export async function exchangeCodeForToken(code) {
  const res = await axios.post(
    'https://api.x.com/oauth2/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: env.xRedirectUri,
      client_id: env.xClientId,
      client_secret: env.xClientSecret,
      code_verifier: 'dummy_challenge'
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return res.data;
}

/**
 * Fetch logged-in user's X profile.
 */
export async function fetchXUserProfile(accessToken) {
  const res = await axios.get(
    'https://api.x.com/2/users/me?user.fields=username',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return res.data.data;
}

/**
 * Upsert user in DB and issue JWT for frontend.
 */
export async function createOrUpdateUserAndJwt(tokens) {
  const profile = await fetchXUserProfile(tokens.access_token);

  const user = await prisma.user.upsert({
    where: { xUserId: profile.id },
    create: {
      xUserId: profile.id,
      xUsername: profile.username,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    },
    update: {
      xUsername: profile.username,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    }
  });

  const jwtToken = jwt.sign(
    { userId: user.id, xUserId: user.xUserId },
    env.jwtSecret,
    { expiresIn: '7d' }
  );

  return { user, jwtToken };
}
