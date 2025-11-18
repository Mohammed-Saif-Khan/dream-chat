export const dynamic = "force-dynamic";

import WebLayout from "@/layout";
import Home from "@/section/home";
import { getProfile } from "@/services/profile";
import { ThemeProvider } from "@/theme/theme-provider";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const profile = await getProfile();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebLayout pathname={slug} profile={profile} query={query}>
        <Suspense fallback={<p>Loding...</p>}>
          <Home profile={profile} />
        </Suspense>
      </WebLayout>
    </ThemeProvider>
  );
}
