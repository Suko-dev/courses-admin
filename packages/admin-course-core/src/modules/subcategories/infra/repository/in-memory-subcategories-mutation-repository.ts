import { SubcategoriesMutationRepository } from './subcategories-mutation-repository';
import { Subcategory } from '../../domain/subcategory';
import { Result, succeed } from '@admin-cursos/core';

export class InMemorySubcategoriesMutationRepository implements SubcategoriesMutationRepository {
  private subcategories: Subcategory[] = [];

  async save(subcategory: Subcategory | Subcategory[]): Promise<Result<Error, void>> {
    if (!Array.isArray(subcategory)) {
      subcategory = [subcategory];
    }
    this.subcategories.push(...subcategory);

    return succeed();
  }
}
