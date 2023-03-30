import { Category } from '../types';
import { Action, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../providers/redux';

interface CategoriesState {
  data: Category[];
}

interface ActionType extends Action {
  payload: any;
}

export const initialState: CategoriesState = {
  data: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategories: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectCategories = (state: RootState): Category[] =>
  state.categories.data;

export default categoriesSlice.reducer;
