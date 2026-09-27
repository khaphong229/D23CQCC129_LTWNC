import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],

  toggleFavorite: (product) => {
    set((state) => {
      const isExist = state.favorites.some((item) => item.id === product.id);
      if (isExist) {
        return {
          favorites: state.favorites.filter((item) => item.id !== product.id),
        };
      }
      return {
        favorites: [...state.favorites, product],
      };
    });
  },

  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== id),
    }));
  },

  clearFavorites: () => {
    set({ favorites: [] });
  },
}));
