import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Note: this file is named `proxy.ts` (not `middleware.ts`), which is the
// convention used by Next.js 16 and later. Its job here is to detect which
// locale a request should be served in (from the URL, a cookie, or the
// browser's Accept-Language header) and rewrite/redirect accordingly.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api, /trpc routes
  // - Next.js internals (/_next, /_vercel)
  // - files with an extension (e.g. favicon.ico, images)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
