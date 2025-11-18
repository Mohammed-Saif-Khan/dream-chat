import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   const publicPaths = [
//     "/auth/sign-in",
//     "/auth/sign-up",
//     "/auth/forgot-password",
//     "/auth/otp",
//     "/auth/reset-password",
//     "/auth/success",
//     "/",
//   ];

//   // Check if the current path is a public path
//   const isPublicPath = publicPaths.some(
//     (path) => request.nextUrl.pathname === path
//   );

//   if (!token && !isPublicPath) {
//     // If no token and not a public path, redirect to login
//     return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//   }

//   if (token && isPublicPath) {
//     return NextResponse.redirect(new URL("/chat", request.url)); // Adjust '/' as needed
//   }

//   // If authenticated or on a public path, allow the request to proceed
//   return NextResponse.next();
// }

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const publicPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/otp",
    "/auth/reset-password",
    "/auth/success",
    "/",
  ];

  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // If no token and in protected path → go to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // If token exists → validate it here
  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (res.status === 401) {
      const response = NextResponse.redirect(
        new URL("/auth/sign-in", request.url)
      );
      response.cookies.set("token", "", { maxAge: 0 });
      return response;
    }
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

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
