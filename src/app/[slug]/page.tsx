import WebLayout from "@/layout";
import Home from "@/section/home";
import { getProfile } from "@/store/profile";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfile();

  console.log(profile, "proifle");

  return (
    <WebLayout pathname={slug} profile={profile}>
      <Suspense fallback={<p>Loding...</p>}>
        <Home />
      </Suspense>
    </WebLayout>
  );
}
