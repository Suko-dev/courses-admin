import { PaginatedReponse } from '../../../types';

export type Subcategory = {
  id: string;
  name: string;
  isActive: boolean;
  code: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type PaginatedSubcategory = PaginatedReponse<Subcategory>;

export const emptySubcategory: Subcategory = {
  id: '',
  name: '',
  createdAt: '',
  category: '',
  isActive: false,
  updatedAt: '',
  code: '',
  deletedAt: null,
};
