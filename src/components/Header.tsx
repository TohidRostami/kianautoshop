"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone, Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  const contact = useTranslations("About");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "fa" ? "en" : "fa";

  const navItems = [
    { href: "/" as const, label: t("home") },
    { href: "/automobiles" as const, label: t("automobiles") },
    { href: "/about" as const, label: t("about") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-mist/10 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-paper"
        >
          <span
            aria-hidden
            className="inline-block size-2 rounded-full bg-rust"
          />
          {locale === "fa" ? "کیان" : "KIAN"}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative py-2 text-sm font-medium text-mist transition-colors hover:text-paper",
                isActive(item.href) && "text-paper",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 bg-rust transition-transform duration-300 ease-out group-hover:scale-x-100",
                  isActive(item.href) && "scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${contact("contact.phone").replace(/[^\d+]/g, "")}`}
            className="figures flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-paper"
          >
            <Phone className="size-4 text-rust" strokeWidth={1.75} />
            {contact("contact.phone")}
          </a>
          <Link
            href={pathname}
            locale={otherLocale}
            className="flex items-center gap-1.5 rounded-full border border-mist/25 px-3.5 py-1.5 text-sm font-medium text-paper transition-colors hover:border-rust hover:text-rust"
          >
            <Languages className="size-3.5" strokeWidth={1.75} />
            {t("language")}
          </Link>
        </div>

        {/* Mobile trigger */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label={t("openMenu")}
              className="flex items-center justify-center rounded-sm p-2 text-paper lg:hidden"
            >
              <Menu className="size-6" strokeWidth={1.75} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="overlay-anim fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden" />
            <Dialog.Content
              className="drawer-anim fixed inset-y-0 end-0 z-50 flex w-full max-w-xs flex-col border-s border-mist/15 bg-surface p-6 shadow-2xl lg:hidden"
              aria-describedby={undefined}
            >
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-extrabold text-paper">
                  {locale === "fa" ? "کیان" : "KIAN"}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label={t("closeMenu")}
                    className="flex items-center justify-center rounded-sm p-2 text-mist hover:text-paper"
                  >
                    <X className="size-6" strokeWidth={1.75} />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-mist/10 py-4 text-xl font-semibold text-mist transition-colors",
                      isActive(item.href) && "text-rust",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <a
                  href={`tel:${contact("contact.phone").replace(/[^\d+]/g, "")}`}
                  className="figures flex items-center gap-2 text-base font-medium text-paper"
                >
                  <Phone className="size-4 text-rust" strokeWidth={1.75} />
                  {contact("contact.phone")}
                </a>
                <Link
                  href={pathname}
                  locale={otherLocale}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-mist/25 px-4 py-2.5 text-sm font-medium text-paper"
                >
                  <Languages className="size-3.5" strokeWidth={1.75} />
                  {t("language")}
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </header>
  );
}
