export const dynamic = "force-dynamic";

import WebLayout from "@/layout";
import Home from "@/section/home";
import { getUserExploreList } from "@/services/explore";
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
  const userList = await getUserExploreList();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebLayout
        pathname={slug}
        profile={profile}
        query={query}
        userList={userList}
      >
        <Suspense fallback={<p>Loding...</p>}>
          <Home profile={profile} userList={userList} />
        </Suspense>
      </WebLayout>
    </ThemeProvider>
  );
}
