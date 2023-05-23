import { Category } from '../../domain/category';
import { Result } from '@admin-cursos/core';

export interface CategoriesRepository {
  save: (category: Category | Category[]) => Promise<Result<Error, void>>;
  list: () => Promise<Result<Error, Category[]>>;
}
