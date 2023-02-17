import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import categoriesReducer, {
  categoriesSlice,
} from './categories/category-slice';

const store = () =>
  configureStore({
    reducer: {
      [categoriesSlice.name]: categoriesReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);
