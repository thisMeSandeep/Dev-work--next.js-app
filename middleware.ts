import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  try {
    // Get session using NextAuth v5 pattern
    const session = await auth();

    const isHome = nextUrl.pathname === "/";
    const isAuthPage =
      nextUrl.pathname.startsWith("/signin") ||
      nextUrl.pathname.startsWith("/signup");
    const isClientRoute = nextUrl.pathname.startsWith("/client");
    const isDeveloperRoute = nextUrl.pathname.startsWith("/developer");

    // Not logged in → allow public pages, block protected
    if (!session?.user) {
      if (isHome || isAuthPage) {
        return NextResponse.next();
      }

      if (isClientRoute || isDeveloperRoute) {
        // For auth redirects, we want to replace the current history entry
        // so the back button goes to the previous page, not the protected route
        const response = NextResponse.redirect(new URL("/signin", nextUrl));
        // Add a custom header to indicate this is an auth redirect
        response.headers.set("X-Auth-Redirect", "true");
        return response;
      }

      return NextResponse.next(); // other public pages (about, contact, etc.)
    }

    // Logged in → enforce Upwork-style redirects
    const role = session.user.role as Role;

    // Validate role is valid
    const isValidRole = role === "CLIENT" || role === "DEVELOPER";
    
    // (a) If user visits `/` → redirect to their dashboard
    if (isHome) {
      if (role === "CLIENT") {
        return NextResponse.redirect(new URL("/client/jobs", nextUrl));
      }
      if (role === "DEVELOPER") {
        return NextResponse.redirect(new URL("/developer", nextUrl));
      }
      // Invalid role - redirect to signin page
      if (!isValidRole) {
        return NextResponse.redirect(new URL("/signin", nextUrl));
      }
    }

    // (b) If user visits signin/signup → redirect to their dashboard
    if (isAuthPage) {
      if (role === "CLIENT") {
        return NextResponse.redirect(new URL("/client/jobs", nextUrl));
      }
      if (role === "DEVELOPER") {
        return NextResponse.redirect(new URL("/developer", nextUrl));
      }
      // Invalid role - redirect to signin page
      if (!isValidRole) {
        return NextResponse.redirect(new URL("/signin", nextUrl));
      }
    }

    // (c) Role-based protection
    if (isClientRoute && role !== "CLIENT") {
      // If invalid role, redirect to signin; otherwise redirect to home
      if (!isValidRole) {
        return NextResponse.redirect(new URL("/signin", nextUrl));
      }
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    if (isDeveloperRoute && role !== "DEVELOPER") {
      // If invalid role, redirect to signin; otherwise redirect to home
      if (!isValidRole) {
        return NextResponse.redirect(new URL("/signin", nextUrl));
      }
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    // On error, allow the request to continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     * - job (public job viewing page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets|job).*)",
  ],
};
