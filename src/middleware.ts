import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login";

  if ((!token || token.provider !== "credentials") && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token?.provider === "credentials" && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
