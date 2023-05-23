import { CategoriesRepository } from './categories.repository';
import { Category } from '../../domain/category';
import { Result, succeed } from '@admin-cursos/core';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[] = [];

  async save(category: Category | Category[]): Promise<Result<Error, void>> {
    if (!Array.isArray(category)) {
      category = [category];
    }
    this.categories.push(...category);

    return succeed();
  }

  async list(): Promise<Result<Error, Category[]>> {
    return succeed(this.categories);
  }
}
