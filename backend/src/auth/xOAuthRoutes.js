import express from 'express';
import {
  getXAuthUrl,
  exchangeCodeForToken,
  createOrUpdateUserAndJwt
} from './xOAuthService.js';
import { env } from '../config/env.js';

export const xAuthRouter = express.Router();

// GET /auth/x/login
xAuthRouter.get('/login', (req, res) => {
  const state = 'static_state'; // TODO: generate and validate per session
  const url = getXAuthUrl(state);
  res.redirect(url);
});

// GET /auth/x/callback
xAuthRouter.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).send('Missing code');

  try {
    const tokens = await exchangeCodeForToken(code);
    const { jwtToken } = await createOrUpdateUserAndJwt(tokens);

    // Redirect to frontend with JWT in URL fragment
    return res.redirect(`${env.frontendUrl}/dashboard#token=${encodeURIComponent(jwtToken)}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Auth failed');
  }
});
