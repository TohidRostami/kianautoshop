import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import ImageGallery from "@/components/ImageGallery";
import SpecPlate, { type SpecPlateItem } from "@/components/SpecPlate";
import AutomobileCard from "@/components/AutomobileCard";
import {
  bodyTypeLabels,
  getAllAutomobiles,
  getAutomobileBySlug,
  getRelatedAutomobiles,
} from "@/data/automobiles";
import { formatNumber, toWhatsAppNumber } from "@/lib/format";

export function generateStaticParams() {
  return getAllAutomobiles().map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const car = getAutomobileBySlug(slug);
  if (!car) return {};
  const l = locale as "fa" | "en";
  return {
    title: `${car.brand} ${car.model} ${car.year}`,
    description: car.description[l],
  };
}

export default async function AutomobileDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as "fa" | "en";
  const car = getAutomobileBySlug(slug);
  if (!car) notFound();

  const t = await getTranslations("AutomobileDetail");
  const cardT = await getTranslations("AutomobileCard");
  const nav = await getTranslations("Nav");
  const about = await getTranslations("About");
  const isRtl = locale === "fa";
  const BackIcon = isRtl ? ChevronRight : ChevronLeft;

  const specs: SpecPlateItem[] = [
    { label: t("specs.year"), value: String(car.year), mono: true },
    {
      label: t("specs.mileage"),
      value: `${formatNumber(car.mileageKm)} ${t("kmUnit")}`,
      mono: true,
    },
    { label: t("specs.transmission"), value: car.transmission[l] },
    { label: t("specs.fuelType"), value: car.fuelType[l] },
    { label: t("specs.engine"), value: car.engine, mono: true },
    { label: t("specs.drivetrain"), value: car.drivetrain, mono: true },
    { label: t("specs.color"), value: car.color[l] },
    { label: t("specs.bodyType"), value: bodyTypeLabels[car.bodyType][l] },
    {
      label: t("specs.seats"),
      value: `${formatNumber(car.seats)} ${t("seatsUnit")}`,
      mono: true,
    },
  ];

  const related = getRelatedAutomobiles(car);
  const phone = about("contact.phone");
  const whatsapp = toWhatsAppNumber(about("contact.mobile"));

  return (
    <Container className="py-12 sm:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-mist">
        <Link href="/" className="hover:text-paper">
          {nav("home")}
        </Link>
        <span aria-hidden>/</span>
        <Link href="/automobiles" className="hover:text-paper">
          {nav("automobiles")}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-paper">
          {car.brand} {car.model}
        </span>
      </nav>

      <Link
        href="/automobiles"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-mist hover:text-paper"
      >
        <BackIcon className="size-4" />
        {t("back")}
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ImageGallery images={car.images} brand={car.brand} model={car.model} />
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="figures text-sm font-medium text-mist">
              {car.year}
              <span className="px-1.5">·</span>
              {bodyTypeLabels[car.bodyType][l]}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-paper sm:text-4xl">
              {car.brand} {car.model}
            </h1>
            <p className="figures mt-5 font-mono text-4xl font-bold text-rust">
              {formatNumber(car.price)}
              <span className="ms-2 font-sans text-base font-normal text-mist">
                {cardT("priceUnit")}
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {car.highlights[l].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-mist/20 px-2.5 py-1 text-xs text-mist"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7 border border-mist/15 bg-surface/50 p-6">
              <h2 className="text-base font-semibold text-paper">
                {t("contact.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {t("contact.body")}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="figures inline-flex flex-1 items-center justify-center gap-2 bg-rust px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-rust-dark"
                >
                  <Phone className="size-4" strokeWidth={1.75} />
                  {t("contact.callButton")}
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-mist/25 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper"
                >
                  <MessageCircle className="size-4" strokeWidth={1.75} />
                  {t("contact.whatsappButton")}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <SpecPlate title={t("specsTitle")} items={specs} />
      </div>

      <div className="mt-14 max-w-3xl">
        <h2 className="text-xl font-bold text-paper">
          {t("descriptionTitle")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-mist">
          {car.description[l]}
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-xl font-bold text-paper">
            {t("related.title")}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedCar) => (
              <AutomobileCard key={relatedCar.id} car={relatedCar} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
