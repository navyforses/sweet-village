import type { VenueMenuCategory } from "@/content/resolve";

/**
 * Filters the language-resolved menu by a free-text query. Matches the
 * visible name plus the names in every other language, so a guest reading
 * the Arabic menu still finds "khachapuri".
 */
export function searchMenu(categories: VenueMenuCategory[], query: string): VenueMenuCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return categories;
  return categories
    .map(category => ({
      ...category,
      items: category.items.filter(item => item.name.toLowerCase().includes(q) || item.searchText.includes(q)),
    }))
    .filter(category => category.items.length > 0);
}
