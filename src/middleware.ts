import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const publicPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/otp",
    "auth/reset-password",
    "/auth/success",
    "/",
  ];

  // Check if the current path is a public path
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path
  );

  if (!token && !isPublicPath) {
    // If no token and not a public path, redirect to login
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/chat", request.url)); // Adjust '/' as needed
  }

  // If authenticated or on a public path, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes, if you handle auth within them)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
