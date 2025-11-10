"use server";
import { cookies } from "next/headers";

type CookieAction = "get" | "set" | "delete";

export async function nextCookies(
  key: string,
  value?: string,
  action: CookieAction = "get"
): Promise<string | void> {
  const cookieStore = await cookies();

  switch (action) {
    case "get":
      return cookieStore.get(key)?.value;

    case "set":
      if (value !== undefined) {
        cookieStore.set(key, value, {
          httpOnly: true,
          secure: true,
          path: "/",
          // maxAge: 60 * 60 * 24 * 7,
          maxAge: 60 * 60 * 1,
        });
      }
      break;

    case "delete":
      cookieStore.delete(key);
      break;
  }
}
