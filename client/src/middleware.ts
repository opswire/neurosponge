import { NextRequest, NextResponse } from "next/server";
import { getNewSessionToken } from "./shared";

// Specify protected, public, and no-auth routes
const protectedRoutes = ["/profile"];
const publicRoutes = ["/search"];
const noAuthRoutes = ["/auth/login", "/auth/signup", "/"];

export default async function middleware(req: NextRequest) {
  // Check if the path is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  /* eslint-disable no-unused-vars */
  const isPublicRoute = publicRoutes.includes(path);
  const isNoAuthRoute = noAuthRoutes.includes(path);
  //Intercept response to update token
  const newToken = await getNewSessionToken();

  //if authenticated
  if (newToken) {
    let response;

    // Redirect to home page if route is non-auth only
    if (isNoAuthRoute) {
      response = NextResponse.redirect(new URL("/home", req.nextUrl));
    } else {
      // Continue to protected or public route
      response = NextResponse.next();
    }

    response.cookies.set("token", newToken.data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: newToken.data.expires_in,
    });

    return response;
  }
  //if not authenticated
  else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    return NextResponse.next();
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
