import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = { ids: string[] };

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const i = state.ids.indexOf(id);
      if (i === -1) state.ids.push(id);
      else state.ids.splice(i, 1);
    },
    setFavorite(state, action: PayloadAction<{ id: string; value: boolean }>) {
      const { id, value } = action.payload;
      const i = state.ids.indexOf(id);
      if (value && i === -1) state.ids.push(id);
      if (!value && i !== -1) state.ids.splice(i, 1);
    },
  },
});

export const { toggleFavorite, setFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;