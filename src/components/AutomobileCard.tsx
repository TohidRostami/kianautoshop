import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { bodyTypeLabels, type Automobile } from "@/data/automobiles";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AutomobileCard({
  car,
  priority = false,
}: {
  car: Automobile;
  priority?: boolean;
}) {
  const t = useTranslations("AutomobileCard");
  const locale = useLocale() as "fa" | "en";
  const ArrowIcon = locale === "fa" ? ArrowUpLeft : ArrowUpRight;

  return (
    <Link
      href={`/automobiles/${car.slug}`}
      className="group flex flex-col overflow-hidden border border-mist/15 bg-surface/40 transition-colors hover:border-rust/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-taupe">
        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 bg-ink/80 px-2.5 py-1 text-xs font-medium text-paper figures">
          {car.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-paper">
          {car.brand} {car.model}
        </h3>
        <p className="mt-1 text-sm text-mist">
          {bodyTypeLabels[car.bodyType][locale]}
          <span className="px-1.5">·</span>
          <span className="figures">{formatNumber(car.mileageKm)}</span>{" "}
          {t("kmUnit")}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {car.highlights[locale].slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-mist/20 px-2.5 py-1 text-xs text-mist"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-mist/10 pt-4">
          <p className={cn("figures font-mono text-base font-semibold text-rust")}>
            {formatNumber(car.price)}
            <span className="ms-1.5 font-sans text-xs font-normal text-mist">
              {t("priceUnit")}
            </span>
          </p>
          <span className="flex items-center gap-1 text-sm font-medium text-paper">
            {t("viewDetails")}
            <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
