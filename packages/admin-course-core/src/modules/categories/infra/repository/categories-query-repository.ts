import { Category } from '../../domain/category';
import { Result } from '@admin-cursos/core';

export interface CategoriesRepository {
  list: () => Promise<Result<Error, Category[]>>;
}
