import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales supported by the gallery. Persian (Farsi) is the
  // primary/default language; English is the secondary language.
  locales: ["fa", "en"],

  // Persian is the main language of the site
  defaultLocale: "fa",

  // Persian (the default locale) is served with no prefix ("/automobiles"),
  // English is served with a prefix ("/en/automobiles").
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
