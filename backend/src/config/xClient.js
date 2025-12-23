import axios from 'axios';
import { env } from './env.js';

export const xApiClient = (accessToken) =>
  axios.create({
    baseURL: env.xApiBaseUrl,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  });

/**
 * TODO:
 * - Add automatic token refresh logic if you use refresh tokens.
 */
