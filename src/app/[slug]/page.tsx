import WebLayout from "@/layout";
import Home from "@/section/home";
import { getProfile } from "@/services/profile";
import { ThemeProvider } from "@/theme/theme-provider";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfile();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebLayout pathname={slug} profile={profile}>
        <Suspense fallback={<p>Loding...</p>}>
          <Home profile={profile} />
        </Suspense>
      </WebLayout>
    </ThemeProvider>
  );
}
