import axios from 'axios';

// In production (Netlify), use the Render backend URL.
// In development, use the local proxy (relative URL works via package.json proxy).
const API = process.env.REACT_APP_API_URL
  ? axios.create({ baseURL: process.env.REACT_APP_API_URL })
  : axios.create({ baseURL: '' });

export const getDataAPI = async (url, token) => {
    const res = await API.get(`/api/${url}`, {
        headers: { Authorization: token }
    });
    return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await API.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await API.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await API.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await API.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
