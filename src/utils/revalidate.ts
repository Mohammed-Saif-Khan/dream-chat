"use server";
import { revalidatePath } from "next/cache";

/**
 * Revalidates a specific path to update cached data
 * @param path - The path to revalidate
 * @param section - Optional section (e.g., "page")
 */
export default async function revalidate(
  path: string,
  section?: "page" | "layout"
) {
  revalidatePath(path, section);
}
