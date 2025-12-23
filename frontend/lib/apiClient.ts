import axios from 'axios';

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export const apiClient = (token?: string) =>
  axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
