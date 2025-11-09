import { nextCookies } from "./next-cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchInstance(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}/${path}`;

  const token = await nextCookies("token", undefined);

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    cache: "no-store",
    ...options,
    headers,
  });
}
