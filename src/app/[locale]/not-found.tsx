import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="flex flex-col items-center py-32 text-center">
      <span className="figures font-mono text-6xl font-bold text-rust">404</span>
      <h1 className="mt-4 text-2xl font-bold text-paper">{t("title")}</h1>
      <p className="mt-3 max-w-sm text-mist">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-rust px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-rust-dark"
      >
        {t("backHome")}
      </Link>
    </Container>
  );
}
