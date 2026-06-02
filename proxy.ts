import { NextResponse, type NextRequest } from "next/server";

const AUTH_ROUTE_PREFIX = "/auth";
const LOGIN_PATH = "/auth/sign-in";
const AUTHENTICATED_HOME_PATH = "/admin";
const PROTECTED_ROUTES = ["/admin"];

const createLoginRedirect = (request: NextRequest, pathname: string) => {
  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("redirect", pathname);

  return NextResponse.redirect(loginUrl);
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname.startsWith(AUTH_ROUTE_PREFIX)) {
    if (accessToken) {
      return NextResponse.redirect(new URL(AUTHENTICATED_HOME_PATH, request.url));
    }

    return NextResponse.next();
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !accessToken) {
    return createLoginRedirect(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
