"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import AutomobileCard from "@/components/AutomobileCard";
import { bodyTypeLabels, type Automobile, type BodyType } from "@/data/automobiles";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "priceAsc" | "priceDesc";

export default function AutomobilesExplorer({ cars }: { cars: Automobile[] }) {
  const t = useTranslations("Automobiles");
  const locale = useLocale() as "fa" | "en";
  const [bodyType, setBodyType] = useState<BodyType | "all">("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const bodyTypes: (BodyType | "all")[] = ["all", "sedan", "suv", "coupe"];

  const filtered = useMemo(() => {
    let list = cars.filter(
      (car) => bodyType === "all" || car.bodyType === bodyType,
    );

    list = [...list].sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      return b.year - a.year;
    });

    return list;
  }, [cars, bodyType, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setBodyType(type)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                bodyType === type
                  ? "border-rust bg-rust text-paper"
                  : "border-mist/25 text-mist hover:border-mist/50 hover:text-paper",
              )}
            >
              {type === "all" ? t("filter.all") : bodyTypeLabels[type][locale]}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label={t("filter.sortLabel")}
            className="w-full appearance-none rounded-full border border-mist/25 bg-transparent py-2 ps-4 pe-10 text-sm font-medium text-paper focus:border-rust sm:w-auto"
          >
            <option value="newest" className="bg-ink">
              {t("filter.sortNewest")}
            </option>
            <option value="priceAsc" className="bg-ink">
              {t("filter.sortPriceAsc")}
            </option>
            <option value="priceDesc" className="bg-ink">
              {t("filter.sortPriceDesc")}
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-mist" />
        </div>
      </div>

      <p className="figures mt-6 text-sm text-mist">
        {t("resultsCount", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <AutomobileCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-mist">{t("empty")}</p>
      )}
    </div>
  );
}
