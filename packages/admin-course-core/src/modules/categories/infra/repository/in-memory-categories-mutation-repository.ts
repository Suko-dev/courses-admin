import { CategoriesMutationRepository } from './categories-mutation-repository';
import { Category } from '../../domain/category';
import { Result, succeed } from '@admin-cursos/core';

export class InMemoryCategoriesMutationRepository implements CategoriesMutationRepository {
  private categories: Category[] = [];

  async save(category: Category | Category[]): Promise<Result<Error, void>> {
    if (!Array.isArray(category)) {
      category = [category];
    }
    this.categories.push(...category);

    return succeed();
  }
}
