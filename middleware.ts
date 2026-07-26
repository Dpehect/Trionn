import { NextResponse, type NextRequest } from "next/server";

const FINNISH_PREFIX = "/fi";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const url = request.nextUrl.clone();

  const isFinnish =
    url.pathname === FINNISH_PREFIX ||
    url.pathname.startsWith(`${FINNISH_PREFIX}/`);

  requestHeaders.set("x-softbridge-locale", isFinnish ? "fi" : "en");

  if (isFinnish) {
    url.pathname =
      url.pathname.slice(FINNISH_PREFIX.length) || "/";

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|icon.png|apple-icon.png|.*\\..*).*)",
  ],
};
