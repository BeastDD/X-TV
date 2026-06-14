import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// @ts-expect-error - next-auth v5 beta internal module types for middleware (pre-existing)
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = nextUrl.pathname.startsWith("/tv");

  if (isProtectedRoute && !isLoggedIn) {
    // Send unauthenticated users back to the landing page (where the login button lives)
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Allow everything else (for S0 we only protect /tv)
  return NextResponse.next();
});

// Only run middleware on the TV section for performance
export const config = {
  matcher: ["/tv/:path*"],
};
