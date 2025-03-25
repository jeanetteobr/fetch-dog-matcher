import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Dog } from '../types';

interface FavoritesContextType {
  favorites: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dogId: string) => void;
  isFavorited: (dogId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Dog[]>(() => {
        try {
          const stored = localStorage.getItem('favorites');
          return stored ? JSON.parse(stored) : [];
        } catch (err) {
          console.warn('Failed to parse favorites from storage', err);
          return [];
        }
      });

  // ✅ Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      } catch (err) {
        console.warn('Failed to parse stored favorites:', err);
      }
    }
  }, []);

  // ✅ Save to localStorage whenever favorites change
  useEffect(() => {
    console.log('[Favorites] Saving to localStorage:', favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (dog: Dog) => {
    console.log('[addFavorite] Dog added:', dog);
    setFavorites((prev) =>
      prev.find((d) => d.id === dog.id) ? prev : [...prev, dog]
    );
  };

  const removeFavorite = (dogId: string) => {
    setFavorites((prev) => prev.filter((d) => d.id !== dogId));
  };

  const isFavorited = (dogId: string) => {
    return favorites.some((d) => d.id === dogId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
};
