import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  
  console.log("🔍 Middleware running for:", nextUrl.pathname);
  
  try {
    // Get session using NextAuth v5 pattern
    const session = await auth();
    console.log("👤 Session:", session ? "Found" : "Not found", session?.user?.role);

    const isHome = nextUrl.pathname === "/";
    const isAuthPage =
      nextUrl.pathname.startsWith("/signin") ||
      nextUrl.pathname.startsWith("/signup");
    const isClientRoute = nextUrl.pathname.startsWith("/client");
    const isDeveloperRoute = nextUrl.pathname.startsWith("/developer");

    // Not logged in → allow public pages, block protected
    if (!session?.user) {
      console.log("🚫 No session, checking access...");
      if (isHome || isAuthPage) {
        console.log("✅ Allowing access to public page");
        return NextResponse.next();
      }

      if (isClientRoute || isDeveloperRoute) {
        console.log("🔒 Redirecting to signin");
        // For auth redirects, we want to replace the current history entry
        // so the back button goes to the previous page, not the protected route
        const response = NextResponse.redirect(new URL("/signin", nextUrl));
        // Add a custom header to indicate this is an auth redirect
        response.headers.set("X-Auth-Redirect", "true");
        return response;
      }

      console.log("✅ Allowing access to other public page");
      return NextResponse.next(); // other public pages (about, contact, etc.)
    }

    // Logged in → enforce Upwork-style redirects
    const role = session.user.role as Role;
    console.log("🎭 User role:", role);

    // (a) If user visits `/` → redirect to their dashboard
    if (isHome) {
      console.log("🏠 User on home page, redirecting to dashboard");
      if (role === "CLIENT") {
        return NextResponse.redirect(new URL("/client/jobs", nextUrl));
      }
      if (role === "DEVELOPER") {
        return NextResponse.redirect(new URL("/developer", nextUrl));
      }
    }

    // (b) If user visits signin/signup → redirect to their dashboard
    if (isAuthPage) {
      console.log("🔐 User on auth page, redirecting to dashboard");
      if (role === "CLIENT") {
        return NextResponse.redirect(new URL("/client/jobs", nextUrl));
      }
      if (role === "DEVELOPER") {
        return NextResponse.redirect(new URL("/developer", nextUrl));
      }
    }

    // (c) Role-based protection
    if (isClientRoute && role !== "CLIENT") {
      console.log("🚫 Client route access denied for non-client user");
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    if (isDeveloperRoute && role !== "DEVELOPER") {
      console.log("🚫 Developer route access denied for non-developer user");
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    console.log("✅ Access granted");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Middleware error:", error);
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
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
