import WebLayout from "@/layout";
import Home from "@/section/home";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <WebLayout pathname={slug}>
      <Suspense fallback={<p>Loding...</p>}>
        <Home />
      </Suspense>
    </WebLayout>
  );
}
