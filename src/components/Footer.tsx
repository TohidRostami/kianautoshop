import { getTranslations, getLocale } from "next-intl/server";
import { Camera, Send, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const about = await getTranslations("About");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mist/10 bg-ink">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
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
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            {t("tagline")}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-mist transition-colors hover:text-rust"
            >
              <Camera className="size-5" strokeWidth={1.75} />
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="text-mist transition-colors hover:text-rust"
            >
              <Send className="size-5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-mist">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-paper">
            <li>
              <Link href="/" className="transition-colors hover:text-rust">
                {nav("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/automobiles"
                className="transition-colors hover:text-rust"
              >
                {nav("automobiles")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-rust"
              >
                {nav("about")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-mist">
            {t("contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-paper">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-rust" strokeWidth={1.75} />
              <span>{about("contact.address")}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-rust" strokeWidth={1.75} />
              <a
                href={`tel:${about("contact.phone").replace(/[^\d+]/g, "")}`}
                className="figures transition-colors hover:text-rust"
              >
                {about("contact.phone")}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-rust" strokeWidth={1.75} />
              <a
                href={`mailto:${about("contact.email")}`}
                className="figures transition-colors hover:text-rust"
              >
                {about("contact.email")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-mist">
            {t("hours")}
          </h3>
          <p className="mt-4 text-sm text-paper">{about("contact.hours")}</p>
        </div>
      </Container>

      <div className="tick-divider" />

      <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-mist sm:flex-row">
        <p>
          © <span className="figures">{year}</span> {locale === "fa" ? "اتوگالری کیان" : "Kian Auto Gallery"} — {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
