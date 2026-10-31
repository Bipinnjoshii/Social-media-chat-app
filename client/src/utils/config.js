export const BASE_URL =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "https://chirp-chat-app.vercel.app";
