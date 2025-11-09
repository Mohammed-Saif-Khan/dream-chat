// force-cache = Static (SSG)
// no-store = Dynamic (SSR)

import { nextCookies } from "./next-cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type FetchOptions = RequestInit & {
  ssr?: boolean; // server-side render
  csr?: boolean; // client-side render
  auth?: boolean; // default → true
};

export async function fetchInstance(path: string, options: FetchOptions = {}) {
  const url = `${BASE_URL}/${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  let token: string | void | null = null;
  let cache: RequestCache = "force-cache"; // default → SSG/ISR

  // default auth = true agar explicitly false na ho
  const useAuth = options.auth !== false;

  // --- Agar method POST / PUT / DELETE hai toh cache disable karo ---
  if (options.method && ["POST", "PUT", "DELETE"].includes(options.method)) {
    cache = "no-store";
  }

  // --- SSR Fetching ---
  if (options.ssr) {
    cache = "no-store"; // SSR hamesha fresh data lega
    if (useAuth) {
      token = await nextCookies("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  // --- CSR Fetching ---
  if (options.csr) {
    cache = "no-store";
    if (useAuth) {
      token = await nextCookies("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  return fetch(url, {
    ...options,
    headers,
    cache,
  });
}

// --------------HOW TO USE ------------
// Default → SSG (force-cache)
// await fetchInstance("products");

// SSR without token
// await fetchInstance("products", { ssr: true });

// SSR with token (if cookie exists)
// await fetchInstance("user/profile", { ssr: true });

// POST/PUT/DELETE example (cache automatically no-store hoga)
// await fetchInstance("tripnotes/31", { method: "PUT", body: JSON.stringify(data) });
