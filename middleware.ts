import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  // Strip WordPress legacy query parameters (?page_id=, ?p=, ?preview=)
  // These create duplicate content in Google's index
  if (
    searchParams.has("page_id") ||
    searchParams.has("p") ||
    searchParams.has("preview") ||
    searchParams.has("preview_id")
  ) {
    const cleanUrl = new URL(pathname, request.url);
    return NextResponse.redirect(cleanUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on paths that might have WordPress params (not on api, _next, static)
  matcher: ["/((?!api|_next/static|_next/image|favicon|og-image|apple-touch|llms|robots|sitemap).*)"],
};
