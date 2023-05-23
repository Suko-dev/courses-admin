import { fail, Result, succeed } from '@admin-cursos/core';
import { Category } from '../../../domain/category';
import { CreateCategoryError } from './types/errors';
import { CreateCategoryInput } from './types/createCategoryInput';
import { CategoriesRepository } from '../../../infra/repository/categories.repository';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(props: CreateCategoryInput): Promise<Result<CreateCategoryError, Category>> {
    const category = Category.Create(props);
    if (category.isFailure()) {
      return fail(category.value);
    }
    const saveResult = await this.categoryRepository.save(category.value);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(category.value);
  }
}
