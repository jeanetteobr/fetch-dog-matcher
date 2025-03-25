import { createContext, useContext, useState, ReactNode } from 'react';
import { Dog } from '../types';

interface FavoritesContextType {
    favorites: Dog[];
    addFavorite: (dog: Dog) => void;
    removeFavorite: (dogId: string) => void;
    isFavorited: (dogId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Dog[]>([]);

    const addFavorite = (dog: Dog) => {
        setFavorites((prev) =>
            prev.find((d) => d.id === dog.id) ? prev : [...prev, dog]
        );
    };

    const removeFavorite = (dogId: string) => {
        setFavorites((prev) => prev.filter((d) => d.id !== dogId));
    };

    const isFavorited = (dogId: string) =>
        favorites.some((d) => d.id === dogId);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorited }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
    return ctx;
};
