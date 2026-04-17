import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from "astro:content";
import {
  defaultLocale,
  getEntryLocaleFromSlug,
  getLocalizedEntryId,
  stripLocalePrefixFromSlug,
  type SiteLocale,
} from "@lib/i18n";

const parsePinned = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return ["yes", "true", "1", "y"].includes(value.trim().toLowerCase());
  }
  return false;
};

export const getPublishedCollection = async <C extends CollectionKey>(
  collectionName: C,
): Promise<CollectionEntry<C>[]> => {
  const entries = await getCollection(collectionName);
  return entries.filter((entry) => entry.data?.draft !== true);
};

export const sortCollectionEntries = <C extends CollectionKey>(
  collectionName: C,
  entries: CollectionEntry<C>[],
): CollectionEntry<C>[] => {
  const shouldSortByPinned = collectionName === "blog" || collectionName === "portfolio";

  return [...entries].sort((a, b) => {
    if (shouldSortByPinned) {
      const aPinned = parsePinned((a.data as { pinned?: unknown }).pinned);
      const bPinned = parsePinned((b.data as { pinned?: unknown }).pinned);
      if (aPinned !== bPinned) return aPinned ? -1 : 1;
    }

    const aDate = "date" in a.data ? new Date(String(a.data.date)).valueOf() : 0;
    const bDate = "date" in b.data ? new Date(String(b.data.date)).valueOf() : 0;
    return bDate - aDate;
  });
};

export const getLocalizedCollection = async <C extends CollectionKey>(
  collectionName: C,
  locale: SiteLocale,
): Promise<CollectionEntry<C>[]> => {
  const entries = await getPublishedCollection(collectionName);
  return sortCollectionEntries(
    collectionName,
    entries.filter((entry) => getEntryLocaleFromSlug(entry.slug) === locale),
  );
};

export const getLocalizedEntry = async <C extends CollectionKey>(
  collectionName: C,
  slug: string,
  locale: SiteLocale,
): Promise<CollectionEntry<C> | undefined> => {
  try {
    const entry = await getEntry(collectionName, getLocalizedEntryId(locale, slug));
    if (!entry || entry.data?.draft) return undefined;
    return entry;
  } catch {
    return undefined;
  }
};

export const getEntryBaseSlug = (entry: { slug: string }): string =>
  stripLocalePrefixFromSlug(entry.slug);

export const getAdjacentEntries = <C extends CollectionKey>(
  entries: CollectionEntry<C>[],
  currentBaseSlug: string,
) => {
  const currentIndex = entries.findIndex((entry) => getEntryBaseSlug(entry) === currentBaseSlug);

  return {
    previous: currentIndex > 0 ? entries[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null,
  };
};

export const getLocaleContentId = (slug: string, locale: SiteLocale = defaultLocale): string =>
  locale === defaultLocale ? slug : `${locale}/${slug}`;
