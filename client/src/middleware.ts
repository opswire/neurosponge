import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/shared";

// Specify protected, public, and no-auth routes
const protectedRoutes = ["/profile"];
const publicRoutes = ["/"];
const noAuthRoutes = ["/auth/login", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  // Check if the path is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isNoAuthRoute = noAuthRoutes.includes(path);

  //Get user
  const user = await getUser();

  // Redirect to login if not authenticated
  if (isProtectedRoute && !user?.id) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Redirect to home page if authenticated
  if (isNoAuthRoute && user?.id) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
