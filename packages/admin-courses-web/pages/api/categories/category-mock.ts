import {
  Category,
  PaginatedCategory,
} from '../../../features/categories/types';

const initialCategories: Category[] = Array(28).fill({
  name: 'culinaria',
  code: 'ctg_culinaria',
  createdAt: new Date().toISOString(),
  deletedAt: null,
  id: '1',
  updatedAt: new Date().toISOString(),
  isActive: true,
});

export const inMemoryCategories: Category[] = initialCategories.map(
  (category, index) => ({
    ...category,
    name: `${category.name}_${index + 1}`,
    id: index.toString(),
    code: `${category.code}_${index + 1}`,
  })
);

export interface Result {
  data: Category;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export function create(category: Category): void {
  inMemoryCategories.unshift({
    ...category,
    id: Math.random().toString(),
    code: `ctg_${category.name}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export function deleteCategory(id: string): void {
  const index = inMemoryCategories.findIndex((category) => category.id === id);
  inMemoryCategories.splice(index, 1);
}

export function edit(category: Category): void {
  const index = inMemoryCategories.findIndex(
    (oldCategory) => oldCategory.id === category.id
  );
  inMemoryCategories[index] = category;
}

export function list(query): PaginatedCategory {
  const page = parseInt(query.page);
  const per_page = parseInt(query.per_page);
  const initial = per_page * page;
  const final = initial + per_page;

  return {
    data: inMemoryCategories.slice(initial, final),
    meta: {
      current_page: page < 3 ? page : 3,
      last_page: 3,
      per_page,
      path: '',
      to: 1,
      total: inMemoryCategories.length,
      from: 1,
    },
    links: {
      first: '',
      last: '',
      next: '',
      prev: '',
    },
  };
}

export function find(code: string): Category | undefined {
  return inMemoryCategories.find((category) => category.code === code);
}
