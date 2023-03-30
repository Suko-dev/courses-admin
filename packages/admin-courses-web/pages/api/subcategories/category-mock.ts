import {
  PaginatedSubcategory,
  Subcategory,
} from '../../../features/subcategories';

const initialCategories: Subcategory[] = Array(28).fill({
  name: 'confeitaria',
  code: 'sctg_confeitaria',
  createdAt: new Date().toISOString(),
  deletedAt: null,
  category: 'culinaria',
  id: '1',
  updatedAt: new Date().toISOString(),
  isActive: true,
});

const inMemorySubcategories: Subcategory[] = initialCategories.map(
  (category, index) => ({
    ...category,
    name: `${category.name}_${index + 1}`,
    id: index.toString(),
    code: `${category.code}_${index + 1}`,
  })
);

export interface Result {
  data: Subcategory;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export function create(subcategory): void {
  inMemorySubcategories.unshift({
    ...subcategory,
    id: Math.random().toString(),
    code: `ctg_${subcategory.name}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export function deleteCategory(id: string): void {
  const index = inMemorySubcategories.findIndex(
    (category) => category.id === id
  );
  inMemorySubcategories.splice(index, 1);
}

export function edit(category: Subcategory): void {
  const index = inMemorySubcategories.findIndex(
    (oldCategory) => oldCategory.id === category.id
  );
  inMemorySubcategories[index] = category;
}

export function list(query): PaginatedSubcategory {
  const { page, per_page } = query;
  const initial = per_page * page;
  const final = initial + per_page;
  return {
    data: inMemorySubcategories.slice(initial, final),
    meta: {
      current_page: page < 3 ? page : 3,
      last_page: 3,
      per_page: per_page,
      path: '',
      to: 1,
      total: inMemorySubcategories.length,
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

export function find(code: string): Subcategory | undefined {
  return inMemorySubcategories.find((category) => category.code === code);
}
