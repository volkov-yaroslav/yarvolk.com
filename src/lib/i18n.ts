export const locales = ["en", "ua", "pl"] as const;
export const secondaryLocales = ["ua", "pl"] as const;
export const defaultLocale = "en" as const;

export type SiteLocale = (typeof locales)[number];
export type SecondaryLocale = (typeof secondaryLocales)[number];

type LocaleText = {
  meta: {
    htmlLang: string;
    intlLocale: string;
    nativeName: string;
    label: string;
    siteTitle: string;
    siteDescription: string;
  };
  routes: {
    home: string;
    portfolio: string;
    blog: string;
    about: string;
    contact: string;
    privacy: string;
  };
  menu: {
    home: string;
    portfolio: string;
    blog: string;
    about: string;
    contact: string;
    privacy: string;
    buyCoffee: string;
  };
  footer: {
    clickToGetStarted: string;
    tapToGetStarted: string;
    rightsReserved: string;
  };
  home: {
    allWorks: string;
    allPosts: string;
  };
  blog: {
    keepReading: string;
    pinnedPost: string;
    noPostsInCategory: string;
  };
  portfolio: {
    moreWork: string;
    pinnedProject: string;
    noItemsInCategory: string;
  };
  common: {
    all: string;
    prev: string;
    next: string;
    prevShort: string;
    nextShort: string;
    contact: string;
    whatsapp: string;
    notFound: string;
    backToHome: string;
    noReviews: string;
  };
  contact: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    chatOnWhatsApp: string;
    whatsappIntro: string;
    whatsappNamePrefix: string;
    whatsappEmailPrefix: string;
    fallbackError: string;
  };
};

export const localeText: Record<SiteLocale, LocaleText> = {
  en: {
    meta: {
      htmlLang: "en",
      intlLocale: "en-US",
      nativeName: "English",
      label: "EN",
      siteTitle: "Yaroslav Volkov — WordPress Developer & Digital Solutions",
      siteDescription: "I build WordPress websites, e-commerce stores, and business automations that help companies grow.",
    },
    routes: {
      home: "Home",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      privacy: "Privacy policy",
    },
    menu: {
      home: "Home",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      privacy: "Privacy policy",
      buyCoffee: "Buy me a coffee",
    },
    footer: {
      clickToGetStarted: "Click to get started",
      tapToGetStarted: "Tap to get started",
      rightsReserved: "All rights reserved.",
    },
    home: {
      allWorks: "All Works",
      allPosts: "All Posts",
    },
    blog: {
      keepReading: "Keep Reading",
      pinnedPost: "Pinned post",
      noPostsInCategory: "No posts in this category yet.",
    },
    portfolio: {
      moreWork: "More Work",
      pinnedProject: "Pinned project",
      noItemsInCategory: "No items in this category yet.",
    },
    common: {
      all: "All",
      prev: "Prev",
      next: "Next",
      prevShort: "PREV",
      nextShort: "NEXT",
      contact: "Contact",
      whatsapp: "WhatsApp",
      notFound: "Page Not Found",
      backToHome: "Back to home",
      noReviews: "No reviews available",
    },
    contact: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Contact email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Additional info",
      messagePlaceholder: "Tell me about your project",
      sendMessage: "Send Message",
      sending: "Sending...",
      chatOnWhatsApp: "Chat on WhatsApp",
      whatsappIntro: "Hello, Yaroslav. How are you doing?",
      whatsappNamePrefix: "My name is",
      whatsappEmailPrefix: "My contact email:",
      fallbackError: "Something went wrong. Please try again.",
    },
  },
  ua: {
    meta: {
      htmlLang: "uk",
      intlLocale: "uk-UA",
      nativeName: "Українська",
      label: "UA",
      siteTitle: "Ярослав Волков — WordPress-розробник і цифрові рішення",
      siteDescription: "Я створюю WordPress-сайти, інтернет-магазини та бізнес-автоматизації, які допомагають компаніям зростати.",
    },
    routes: {
      home: "Головна",
      portfolio: "Портфоліо",
      blog: "Блог",
      about: "Про мене",
      contact: "Контакти",
      privacy: "Політика конфіденційності",
    },
    menu: {
      home: "Головна",
      portfolio: "Портфоліо",
      blog: "Блог",
      about: "Про мене",
      contact: "Контакти",
      privacy: "Політика конфіденційності",
      buyCoffee: "Пригостити кавою",
    },
    footer: {
      clickToGetStarted: "Натисни, щоб почати",
      tapToGetStarted: "Торкнися, щоб почати",
      rightsReserved: "Усі права захищено.",
    },
    home: {
      allWorks: "Усі роботи",
      allPosts: "Усі пости",
    },
    blog: {
      keepReading: "Читати далі",
      pinnedPost: "Закріплений пост",
      noPostsInCategory: "У цій категорії ще немає постів.",
    },
    portfolio: {
      moreWork: "Ще роботи",
      pinnedProject: "Закріплений проєкт",
      noItemsInCategory: "У цій категорії ще немає робіт.",
    },
    common: {
      all: "Усе",
      prev: "Назад",
      next: "Далі",
      prevShort: "НАЗАД",
      nextShort: "ДАЛІ",
      contact: "Контакти",
      whatsapp: "WhatsApp",
      notFound: "Сторінку не знайдено",
      backToHome: "На головну",
      noReviews: "Відгуків поки немає",
    },
    contact: {
      nameLabel: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      emailLabel: "Контактний email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Додаткова інформація",
      messagePlaceholder: "Розкажіть про свій проєкт",
      sendMessage: "Надіслати",
      sending: "Надсилання...",
      chatOnWhatsApp: "Чат в WhatsApp",
      whatsappIntro: "Привіт, Ярославе. Як справи?",
      whatsappNamePrefix: "Мене звати",
      whatsappEmailPrefix: "Мій email:",
      fallbackError: "Щось пішло не так. Спробуйте ще раз.",
    },
  },
  pl: {
    meta: {
      htmlLang: "pl",
      intlLocale: "pl-PL",
      nativeName: "Polski",
      label: "PL",
      siteTitle: "Yaroslav Volkov — Programista WordPress i rozwiązania cyfrowe",
      siteDescription: "Tworzę strony WordPress, sklepy internetowe i automatyzacje biznesowe, które pomagają firmom rosnąć.",
    },
    routes: {
      home: "Strona główna",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "O mnie",
      contact: "Kontakt",
      privacy: "Polityka prywatności",
    },
    menu: {
      home: "Start",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "O mnie",
      contact: "Kontakt",
      privacy: "Polityka prywatności",
      buyCoffee: "Postaw mi kawę",
    },
    footer: {
      clickToGetStarted: "Kliknij, aby zacząć",
      tapToGetStarted: "Dotknij, aby zacząć",
      rightsReserved: "Wszelkie prawa zastrzeżone.",
    },
    home: {
      allWorks: "Wszystkie realizacje",
      allPosts: "Wszystkie wpisy",
    },
    blog: {
      keepReading: "Czytaj dalej",
      pinnedPost: "Przypięty wpis",
      noPostsInCategory: "W tej kategorii nie ma jeszcze wpisów.",
    },
    portfolio: {
      moreWork: "Więcej realizacji",
      pinnedProject: "Przypięty projekt",
      noItemsInCategory: "W tej kategorii nie ma jeszcze realizacji.",
    },
    common: {
      all: "Wszystko",
      prev: "Poprzednia",
      next: "Następna",
      prevShort: "WSTECZ",
      nextShort: "DALEJ",
      contact: "Kontakt",
      whatsapp: "WhatsApp",
      notFound: "Nie znaleziono strony",
      backToHome: "Wróć do strony głównej",
      noReviews: "Brak opinii",
    },
    contact: {
      nameLabel: "Imię",
      namePlaceholder: "Twoje imię",
      emailLabel: "Email kontaktowy",
      emailPlaceholder: "you@example.com",
      messageLabel: "Dodatkowe informacje",
      messagePlaceholder: "Opowiedz mi o swoim projekcie",
      sendMessage: "Wyślij",
      sending: "Wysyłanie...",
      chatOnWhatsApp: "Napisz na WhatsApp",
      whatsappIntro: "Cześć, Yaroslav. Jak się masz?",
      whatsappNamePrefix: "Mam na imię",
      whatsappEmailPrefix: "Mój email kontaktowy:",
      fallbackError: "Coś poszło nie tak. Spróbuj ponownie.",
    },
  },
};

const routeLabelMap: Record<string, keyof LocaleText["routes"]> = {
  about: "about",
  blog: "blog",
  contact: "contact",
  portfolio: "portfolio",
  privacy: "privacy",
};

const categoryLabels = {
  website: {
    singular: {
      en: "Website",
      ua: "Сайт",
      pl: "Strona internetowa",
    },
    plural: {
      en: "Websites",
      ua: "Сайти",
      pl: "Strony internetowe",
    },
  },
  development: {
    singular: {
      en: "Development",
      ua: "Розробка",
      pl: "Programowanie",
    },
    plural: {
      en: "Development",
      ua: "Розробка",
      pl: "Programowanie",
    },
  },
  photography: {
    singular: {
      en: "Photography",
      ua: "Фотографія",
      pl: "Fotografia",
    },
    plural: {
      en: "Photography",
      ua: "Фотографія",
      pl: "Fotografia",
    },
  },
  automation: {
    singular: {
      en: "Automation",
      ua: "Автоматизація",
      pl: "Automatyzacja",
    },
    plural: {
      en: "Automation",
      ua: "Автоматизація",
      pl: "Automatyzacja",
    },
  },
  seo: {
    singular: {
      en: "SEO",
      ua: "SEO",
      pl: "SEO",
    },
    plural: {
      en: "SEO",
      ua: "SEO",
      pl: "SEO",
    },
  },
} as const;

const projectInfoLabels: Record<string, Record<SiteLocale, string>> = {
  client: {
    en: "Client",
    ua: "Клієнт",
    pl: "Klient",
  },
  timeline: {
    en: "Timeline",
    ua: "Термін",
    pl: "Czas realizacji",
  },
  "what's included": {
    en: "What's included",
    ua: "Що входило",
    pl: "Zakres prac",
  },
  website: {
    en: "Website",
    ua: "Сайт",
    pl: "Strona",
  },
};

const projectInfoAliases: Record<string, keyof typeof projectInfoLabels> = {
  client: "client",
  "клієнт": "client",
  klient: "client",
  timeline: "timeline",
  "термін": "timeline",
  termin: "timeline",
  "czas realizacji": "timeline",
  "what's included": "what's included",
  "what’s included": "what's included",
  "що входить": "what's included",
  "що входило": "what's included",
  "zakres prac": "what's included",
  website: "website",
  "сайт": "website",
  strona: "website",
};

export const isLocale = (value: string | undefined): value is SiteLocale =>
  Boolean(value && locales.includes(value as SiteLocale));

export const isSecondaryLocale = (
  value: string | undefined,
): value is SecondaryLocale => Boolean(value && secondaryLocales.includes(value as SecondaryLocale));

export const normalizeLocale = (value: string | undefined): SiteLocale =>
  isLocale(value) ? value : defaultLocale;

export const getLocaleFromPathname = (pathname: string): SiteLocale => {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isSecondaryLocale(firstSegment) ? firstSegment : defaultLocale;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isSecondaryLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  }

  return pathname === "" ? "/" : pathname.replace(/\/$/, "") || "/";
};

export const withLeadingSlash = (value: string): string =>
  value.startsWith("/") ? value : `/${value}`;

export const localizePath = (locale: SiteLocale, pathname: string): string => {
  const normalizedPath = withLeadingSlash(stripLocaleFromPathname(pathname));
  if (locale === defaultLocale) {
    return normalizedPath === "/" ? "/" : normalizedPath.replace(/\/$/, "");
  }

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`.replace(/\/$/, "");
};

export const localizePagePath = (locale: SiteLocale, slug = ""): string =>
  localizePath(locale, slug ? `/${slug}` : "/");

export const localizeBlogPath = (locale: SiteLocale, slug = ""): string =>
  localizePath(locale, slug ? `/blog/${slug}` : "/blog");

export const localizePortfolioPath = (locale: SiteLocale, slug = ""): string =>
  localizePath(locale, slug ? `/portfolio/${slug}` : "/portfolio");

export const getLocalizedEntryId = (locale: SiteLocale, slug: string): string =>
  locale === defaultLocale ? slug : `${locale}/${slug}`;

export const getEntryLocaleFromSlug = (slug: string): SiteLocale => {
  const [firstSegment] = slug.split("/");
  return isSecondaryLocale(firstSegment) ? firstSegment : defaultLocale;
};

export const stripLocalePrefixFromSlug = (slug: string): string => {
  const segments = slug.split("/");
  return isSecondaryLocale(segments[0]) ? segments.slice(1).join("/") : slug;
};

export const getRouteLabel = (part: string, locale: SiteLocale): string => {
  const mappedKey = routeLabelMap[part.toLowerCase()];
  if (!mappedKey) return part;
  return localeText[locale].routes[mappedKey];
};

export const getCategoryLabel = (
  value: string | undefined,
  locale: SiteLocale,
  options?: { plural?: boolean },
): string => {
  if (!value) return "";

  const key = value.trim().toLowerCase() as keyof typeof categoryLabels;
  const labelSet = categoryLabels[key];
  if (!labelSet) return value;

  return options?.plural ? labelSet.plural[locale] : labelSet.singular[locale];
};

export const getProjectInfoLabel = (value: string | undefined, locale: SiteLocale): string => {
  if (!value) return "";
  const normalizedKey = projectInfoAliases[value.trim().toLowerCase()];
  const label = normalizedKey ? projectInfoLabels[normalizedKey] : undefined;
  return label ? label[locale] : value;
};

export const getProjectInfoKey = (
  value: string | undefined,
): keyof typeof projectInfoLabels | undefined => {
  if (!value) return undefined;
  return projectInfoAliases[value.trim().toLowerCase()];
};

export const getAlternatePaths = (pathname: string) =>
  locales.map((locale) => ({
    locale,
    href: localizePath(locale, pathname),
  }));
