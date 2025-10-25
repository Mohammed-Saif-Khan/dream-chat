import WebLayout from "@/layout";
import Home from "@/section/home";
import { Suspense } from "react";

export default function Page() {
  return (
    <WebLayout>
      <Suspense fallback={<p>Loding...</p>}>
        <Home />
      </Suspense>
    </WebLayout>
  );
}
