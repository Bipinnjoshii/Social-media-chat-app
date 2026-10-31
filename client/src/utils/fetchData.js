import axios from 'axios';

// In production (Vercel / Netlify), use the Render backend URL directly.
// In local development, use the local proxy (relative URL works via package.json proxy).
const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? ''
    : 'https://campus-connect-api-obe8.onrender.com');

const API = axios.create({ baseURL: API_URL });

// Intercept unauthorized or expired JWT responses to prevent infinite loading loops
API.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const msg = error.response && error.response.data && error.response.data.msg;
      if (
        (error.response && error.response.status === 401) ||
        (typeof msg === 'string' && (msg.includes('jwt') || msg.includes('authorized')))
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('firstLogin');
      }
    } catch (e) {}
    return Promise.reject(error);
  }
);

export const getDataAPI = async (url, token) => {
  const headers = token ? { Authorization: token } : {};
  const res = await API.get(`/api/${url}`, { headers });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const headers = token ? { Authorization: token } : {};
  const res = await API.post(`/api/${url}`, post, { headers });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const headers = token ? { Authorization: token } : {};
  const res = await API.put(`/api/${url}`, post, { headers });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const headers = token ? { Authorization: token } : {};
  const res = await API.patch(`/api/${url}`, post, { headers });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const headers = token ? { Authorization: token } : {};
  const res = await API.delete(`/api/${url}`, { headers });
  return res;
};
