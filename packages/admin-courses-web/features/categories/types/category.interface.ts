import { PaginatedReponse } from '../../../types';

export type Category = {
  id: string;
  name: string;
  isActive: boolean;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type PaginatedCategory = PaginatedReponse<Category>;

export const emptyCategory: Category = {
  name: '',
  isActive: false,
  code: '',
  id: '',
  updatedAt: '',
  deletedAt: null,
  createdAt: '',
};
