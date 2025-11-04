const KEY = 'recipe_favorites_v1';

// PUBLIC_INTERFACE
export const FavoritesService = {
  /** Load favorites from localStorage as a Set of IDs. */
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(arr);
    } catch {
      return new Set();
    }
  },
  /** Save favorites Set to localStorage. */
  save(set) {
    try {
      const arr = Array.from(set);
      localStorage.setItem(KEY, JSON.stringify(arr));
    } catch {
      // ignore write errors
    }
  }
};
