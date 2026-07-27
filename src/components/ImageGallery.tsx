"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function ImageGallery({
  images,
  brand,
  model,
}: {
  images: string[];
  brand: string;
  model: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const t = useTranslations("AutomobileDetail.gallery");
  const locale = useLocale();

  const isRtl = locale === "fa";
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const goTo = (index: number) => setActive((index + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-taupe sm:aspect-[16/10]">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 block h-full w-full"
          aria-label={t("mainAlt", { index: active + 1, brand, model })}
        >
          <Image
            src={images[active]}
            alt={t("mainAlt", { index: active + 1, brand, model })}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </button>

        <span className="figures pointer-events-none absolute bottom-3 end-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-medium text-paper">
          <Expand className="size-3.5" strokeWidth={1.75} />
          {active + 1} / {images.length}
        </span>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="previous"
              className="absolute inset-y-0 start-0 flex w-12 items-center justify-center text-paper/80 transition-colors hover:bg-ink/30 hover:text-paper"
            >
              <PrevIcon className="size-6" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="next"
              className="absolute inset-y-0 end-0 flex w-12 items-center justify-center text-paper/80 transition-colors hover:bg-ink/30 hover:text-paper"
            >
              <NextIcon className="size-6" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden border transition-colors",
                active === index ? "border-rust" : "border-transparent",
              )}
            >
              <Image
                src={src}
                alt={t("thumbAlt", { index: index + 1 })}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay-anim fixed inset-0 z-40 bg-ink/95" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-10"
          >
            <Dialog.Title className="sr-only">
              {brand} {model}
            </Dialog.Title>
            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={images[active]}
                alt={t("mainAlt", { index: active + 1, brand, model })}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="close"
                className="absolute top-4 end-4 flex items-center justify-center rounded-full bg-ink/70 p-2.5 text-paper"
              >
                <X className="size-6" strokeWidth={1.75} />
              </button>
            </Dialog.Close>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="previous"
                  className="absolute inset-y-0 start-2 flex items-center justify-center px-3 text-paper/70 hover:text-paper"
                >
                  <PrevIcon className="size-8" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="next"
                  className="absolute inset-y-0 end-2 flex items-center justify-center px-3 text-paper/70 hover:text-paper"
                >
                  <NextIcon className="size-8" strokeWidth={1.5} />
                </button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
