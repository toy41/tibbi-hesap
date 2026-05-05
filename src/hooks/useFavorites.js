import { useState } from "react";

const KEY = "tibbi-favoriler";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}