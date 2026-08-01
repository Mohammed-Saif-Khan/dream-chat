export const dynamic = "force-dynamic";

import WebLayout from "@/layout";
import Home from "@/section/home";
import { getUserExploreList } from "@/services/explore";
import { getProfile } from "@/services/profile";
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
    <WebLayout pathname={slug} query={query} userList={userList}>
      <Suspense fallback={<p>Loding...</p>}>
        <Home profile={profile} userList={userList} />
      </Suspense>
    </WebLayout>
  );
}
