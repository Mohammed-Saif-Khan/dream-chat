"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const isHomePage = pathname === "/";

  const forcedTheme = isAuthPage || isHomePage ? "light" : undefined;

  return (
    <NextThemesProvider forcedTheme={forcedTheme} {...props}>
      {children}
    </NextThemesProvider>
  );
}
