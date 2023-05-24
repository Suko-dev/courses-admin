import { fail, Result, succeed } from '@admin-cursos/core';
import { Subcategory } from '../../../domain/subcategory';
import { CreateSubCategoryError } from './types/errors';
import { CreateSubcategoryInput } from './types/create-subcategory.input';
import { SubcategoriesMutationRepository } from '../../../infra/repository/subcategories-mutation-repository';

export class CreateSubcategoryUseCase {
  constructor(private subcategoriesRepository: SubcategoriesMutationRepository) {}

  async execute(
    props: CreateSubcategoryInput
  ): Promise<Result<CreateSubCategoryError, Subcategory>> {
    const subcategoryResult = Subcategory.Create(props);
    if (subcategoryResult.isFailure()) {
      return fail(subcategoryResult.value);
    }
    const saveResult = await this.subcategoriesRepository.save(subcategoryResult.value);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(subcategoryResult.value);
  }
}
