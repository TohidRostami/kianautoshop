// This root layout intentionally renders nothing of its own. Every real
// route lives under `app/[locale]/`, and `[locale]/layout.tsx` is the one
// that renders the actual <html>/<body> shell. This file exists only
// because Next.js requires a root layout whenever a root `not-found.tsx`
// is present (see `app/not-found.tsx`, which handles the edge case of a
// request that doesn't resolve to a valid locale at all).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
