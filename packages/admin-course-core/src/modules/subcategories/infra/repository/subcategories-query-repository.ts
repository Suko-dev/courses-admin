import { Subcategory } from '../../domain/subcategory';
import { Result } from '@admin-cursos/core';

export interface SubcategoriesQueryRepository {
  list: () => Promise<Result<Error, Subcategory[]>>;
}
