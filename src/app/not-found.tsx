// Reached only when a request doesn't resolve to a valid locale segment at
// all (e.g. a malformed path the proxy couldn't rewrite). Normal 404s
// within a working locale — a bad automobile slug, a random path under
// /automobiles, etc. — are handled by `app/[locale]/not-found.tsx` instead,
// which has the full design system and translations available.
//
// This file sits *outside* `[locale]/layout.tsx`, so neither Tailwind's
// generated CSS nor next-intl's translations are guaranteed to be loaded
// here — hence plain inline styles and a hard-coded bilingual message
// rather than the usual components. We still use next/link's plain Link
// (not the i18n-aware one from @/i18n/navigation) since it works without
// any routing/locale context and gives client-side navigation for free.
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          margin: 0,
          backgroundColor: "#37322E",
          color: "#F6F3EE",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ fontSize: "3rem", fontWeight: 700, color: "#B34B0C", margin: 0 }}>
          404
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          صفحه پیدا نشد / Page not found
        </h1>
        <p style={{ color: "#B3B2B0", maxWidth: 360, margin: 0 }}>
          آدرس مورد نظر یافت نشد. / The page you requested could not be found.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "0.5rem",
            backgroundColor: "#B34B0C",
            color: "#F6F3EE",
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          صفحه اصلی / Home
        </Link>
      </body>
    </html>
  );
}
