import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import WhyGrid from "@/components/WhyGrid";
import GaugeArt from "@/components/GaugeArt";
import AutomobileCard from "@/components/AutomobileCard";
import { getFeaturedAutomobiles } from "@/data/automobiles";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const ArrowIcon = locale === "fa" ? ArrowUpLeft : ArrowUpRight;
  const featured = getFeaturedAutomobiles();

  const stats = [
    t.raw("stats.years") as { value: string; suffix: string; label: string },
    t.raw("stats.delivered") as {
      value: string;
      suffix: string;
      label: string;
    },
    t.raw("stats.inspected") as {
      value: string;
      suffix: string;
      label: string;
    },
  ];

  const whyItems = t.raw("why.items") as { title: string; body: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-mist/10">
        <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-18 bg-[url('/images/site/logo2.jpg')] bg-cover bg-center bg-no-repeat w-full">
          <div
            className="opacity-0"
            style={{
              animation: "hero-rise 700ms 80ms var(--ease-signature) forwards",
            }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rust">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] text-paper sm:text-6xl">
              {t("hero.titleLine1")}
              <br />
              <span className="text-rust">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/automobiles"
                className="inline-flex items-center gap-2 bg-rust px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-rust-dark"
              >
                {t("hero.ctaPrimary")}
                <ArrowIcon className="size-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-mist/25 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>

          <div
            className="relative mx-auto aspect-square w-full max-w-md opacity-0 lg:max-w-none"
            style={{
              animation: "hero-rise 900ms 200ms var(--ease-signature) forwards",
            }}
          >
            <GaugeArt className="h-full w-full" />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-mist/10 bg-surface/40">
        <Container className="grid grid-cols-1 divide-y divide-mist/10 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-12">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-6 text-center sm:py-0">
              <p className="figures font-mono text-4xl font-bold text-rust">
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-mist">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Featured automobiles */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionIntro
              eyebrow={t("featured.eyebrow")}
              title={t("featured.title")}
              subtitle={t("featured.subtitle")}
            />
            <Link
              href="/automobiles"
              className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-rust hover:text-rust-dark sm:self-auto"
            >
              {t("featured.viewAll")}
              <ArrowIcon className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((car, index) => (
              <AutomobileCard key={car.id} car={car} priority={index === 0} />
            ))}
          </div>
        </Container>
      </section>

      <div className="tick-divider" />

      {/* Why us */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            align="center"
            className="mx-auto"
          />
          <div className="mt-10">
            <WhyGrid items={whyItems} />
          </div>
        </Container>
      </section>

      {/* About teaser */}
      <section className="border-t border-mist/10 bg-surface/40 py-20 sm:py-24">
        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <span
            aria-hidden
            className="figures pointer-events-none absolute -top-6 start-0 select-none font-mono text-[10rem] font-bold leading-none text-mist/10 sm:text-[13rem]"
          >
            1392
          </span>
          <div className="relative">
            <SectionIntro
              eyebrow={t("aboutTeaser.eyebrow")}
              title={t("aboutTeaser.title")}
              subtitle={t("aboutTeaser.body")}
            />
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rust hover:text-rust-dark"
            >
              {t("aboutTeaser.cta")}
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA band */}
      <section className="py-20 sm:py-24">
        <Container className="flex flex-col items-center gap-6 border border-mist/15 bg-surface/40 px-6 py-14 text-center sm:px-14">
          <h2 className="max-w-xl text-3xl font-bold text-paper sm:text-4xl">
            {t("ctaBand.title")}
          </h2>
          <p className="max-w-md text-base text-mist">{t("ctaBand.body")}</p>
          <Link
            href="/about"
            className="mt-2 inline-flex items-center gap-2 bg-rust px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-rust-dark"
          >
            {t("ctaBand.button")}
            <ArrowIcon className="size-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
