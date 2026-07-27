import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Smartphone, Mail, Clock3 } from "lucide-react";
import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import WhyGrid from "@/components/WhyGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const home = await getTranslations("Home");

  const timelineItems = t.raw("timeline.items") as {
    year: string;
    title: string;
    body: string;
  }[];
  const whyItems = home.raw("why.items") as { title: string; body: string }[];

  const contactRows = [
    { icon: MapPin, label: t("contact.addressLabel"), value: t("contact.address"), mono: false },
    { icon: Phone, label: t("contact.phoneLabel"), value: t("contact.phone"), mono: true, href: `tel:${t("contact.phone").replace(/[^\d+]/g, "")}` },
    { icon: Smartphone, label: t("contact.mobileLabel"), value: t("contact.mobile"), mono: true, href: `tel:${t("contact.mobile").replace(/[^\d+]/g, "")}` },
    { icon: Mail, label: t("contact.emailLabel"), value: t("contact.email"), mono: true, href: `mailto:${t("contact.email")}` },
    { icon: Clock3, label: t("contact.hoursLabel"), value: t("contact.hours"), mono: false },
  ];

  return (
    <>
      <section className="border-b border-mist/10 py-16 sm:py-20">
        <Container>
          <SectionIntro
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
            className="max-w-2xl"
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <SectionIntro
            eyebrow={t("timeline.eyebrow")}
            title={t("timeline.title")}
          />
          <ol>
            {timelineItems.map((item, index) => (
              <li key={item.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 size-3 shrink-0 rounded-full bg-rust" />
                  {index < timelineItems.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-mist/20" />
                  )}
                </div>
                <div className={index === timelineItems.length - 1 ? "pb-0" : "pb-10"}>
                  <p className="text-sm font-bold uppercase tracking-wide text-rust">
                    {item.year}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mist">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="tick-divider" />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionIntro title={t("valuesTitle")} align="center" className="mx-auto" />
          <div className="mt-10">
            <WhyGrid items={whyItems} />
          </div>
        </Container>
      </section>

      <section className="border-t border-mist/10 bg-surface/40 py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            subtitle={t("contact.body")}
          />
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {contactRows.map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <row.icon className="mt-0.5 size-5 shrink-0 text-rust" strokeWidth={1.75} />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-mist">
                    {row.label}
                  </dt>
                  <dd
                    className={
                      row.mono
                        ? "figures mt-1 font-mono text-sm text-paper"
                        : "mt-1 text-sm text-paper"
                    }
                  >
                    {row.href ? (
                      <a href={row.href} className="hover:text-rust">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
