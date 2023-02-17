import { Category } from './category.interface';
import { Action, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';

const initialCategories: Category[] = [
  {
    name: 'culinaria',
    code: 'ctg_culinaria',
    createAt: new Date().toLocaleDateString(),
    deletedAt: null,
    id: '1',
    updatedAt: new Date().toLocaleDateString(),
    description: 'null',
  },
  {
    name: 'artesanato',
    code: 'ctg_culinaria',
    createAt: new Date().toLocaleDateString(),
    deletedAt: null,
    id: '2',
    updatedAt: new Date().toLocaleDateString(),
    description: 'null',
  },
];

interface CategoriesState {
  categoriesState: Category[];
}

interface ActionType extends Action {
  payload: any;
}

export const initialState: CategoriesState = {
  categoriesState: initialCategories,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: ActionType) => {
      return {
        ...state,
        ...action.payload.categories,
      };
    });
  },
});

export const selectCategories = (state: RootState): Category[] =>
  state.categories.categoriesState;

export default categoriesSlice.reducer;
