import { Subcategory } from '../../domain/subcategory';
import { Result } from '@admin-cursos/core';

export interface SubcategoriesMutationRepository {
  save: (subcategory: Subcategory | Subcategory[]) => Promise<Result<Error, void>>;
}
