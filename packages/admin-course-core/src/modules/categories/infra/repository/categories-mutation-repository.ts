import { Category } from '../../domain/category';
import { Result } from '@admin-cursos/core';

export interface CategoriesMutationRepository {
  save: (category: Category | Category[]) => Promise<Result<Error, void>>;
}
