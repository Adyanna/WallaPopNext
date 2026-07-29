import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/auth-token";

const PRIVATE_ROUTES = ["/ads/new", "/my-ads", "/profile"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    PRIVATE_ROUTES.some((route) => pathname.startsWith(route)) ||
    /^\/ads\/\d+\/edit$/.test(pathname);

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await verifySessionToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/ads/new/:path*",
    "/ads/:path*/edit",
    "/my-ads/:path*",
    "/profile/:path*",
  ],
};
