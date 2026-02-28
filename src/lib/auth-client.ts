import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:6006",
  // baseURL: "https://api.pixprocoder-studio.com",
});
