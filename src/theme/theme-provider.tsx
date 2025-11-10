"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeHandler>{children}</ThemeHandler>
    </NextThemesProvider>
  );
}

function ThemeHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const authURL = [
    "/auth/sign-up",
    "/auth/sign-in",
    "/auth/forgot-password",
    "/auth/otp",
    "/auth/reset-password",
    "/auth/success",
  ];

  React.useEffect(() => {
    if (authURL.includes(pathname)) {
      setTheme("light");
    } else {
      setTheme("system");
    }
  }, [pathname, setTheme]);

  return <>{children}</>;
}
