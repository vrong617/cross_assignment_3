import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../components/CarCard';

type FavoritesState = {
  ids: string[];
  entities: Record<string, Car | undefined>;
};

const initialState: FavoritesState = {
  ids: [],
  entities: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Car>) {
      const car = action.payload;
      if (!state.entities[car.id]) {
        state.ids.push(car.id);
      }
      state.entities[car.id] = car;
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.entities[id] = undefined;
      state.ids = state.ids.filter(x => x !== id);
    },
    toggleFavorite(state, action: PayloadAction<Car>) {
      const car = action.payload;
      if (state.entities[car.id]) {
        state.entities[car.id] = undefined;
        state.ids = state.ids.filter(x => x !== car.id);
      } else {
        state.entities[car.id] = car;
        state.ids.push(car.id);
      }
    },
    clearFavorites(state) {
      state.ids = [];
      state.entities = {};
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectIsFavorite = (state: RootState, id: string) => !!state.favorites.entities[id];
export const selectFavorites = (state: RootState) =>
  state.favorites.ids.map(id => state.favorites.entities[id]).filter(Boolean) as Car[];

export type RootState = {
  favorites: ReturnType<typeof favoritesSlice.reducer>;
};
