import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import AutomobilesExplorer from "@/components/AutomobilesExplorer";
import { getAllAutomobiles } from "@/data/automobiles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("automobilesTitle"),
    description: t("automobilesDescription"),
  };
}

export default async function AutomobilesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Automobiles");
  const cars = getAllAutomobiles();

  return (
    <Container className="py-16 sm:py-20">
      <SectionIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="mt-10">
        <AutomobilesExplorer cars={cars} />
      </div>
    </Container>
  );
}
