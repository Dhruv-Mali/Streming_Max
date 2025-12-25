import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fetchUser from "./lib/fetchUser";

export async function middleware(request: NextRequest) {
  const user = await fetchUser();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/profile") && !user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
