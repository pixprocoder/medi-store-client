import type { IApiResponse } from "@/types/api.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6006";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<IApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;

  // Get Better Auth session token from cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("better-auth.session_token="))
    ?.split("=")[1];

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP Error: ${response.status}`);
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),

  post: <T>(endpoint: string, data?: unknown) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown) =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown) =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, {
      method: "DELETE",
    }),
};
