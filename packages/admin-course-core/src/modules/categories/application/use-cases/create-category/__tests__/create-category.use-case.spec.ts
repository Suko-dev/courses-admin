import { CreateCategoryUseCase } from '../create-category';
import { CategoriesMutationRepository } from '../../../../infra/repository/categories-mutation-repository';
import { InMemoryCategoriesMutationRepository } from '../../../../infra/repository/in-memory-categories-mutation-repository';
import { Category } from '../../../../domain/category';
import { CreateCategoryInput } from '../types/createCategoryInput';
import { fail } from '@admin-cursos/core';

describe('CreateCategoryUseCase Unit Test', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let repository: CategoriesMutationRepository;

  beforeEach(() => {
    repository = new InMemoryCategoriesMutationRepository();
    createCategoryUseCase = new CreateCategoryUseCase(repository);
  });

  describe('when a valid category input is informed', () => {
    it('should create a new category', async () => {
      // Arrange
      const input = { name: 'category' };

      // Act
      const result = await createCategoryUseCase.execute(input);
      const category = result.value as Category;

      // Assert
      expect(result.isSuccess()).toBeTruthy();
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual('category');
    });
  });

  describe('description', () => {
    describe.each([
      ['a', 'given', 'description'],
      ['no', 'a null', null],
    ])('when %s description is informed', (_, __, description) => {
      it(`should create a new category with ${__} description`, async () => {
        // Arrange
        const input = { name: 'category', description: description || undefined };

        // Act
        const result = await createCategoryUseCase.execute(input);
        const category = result.value as Category;

        // Assert
        expect(category.description).toEqual(description);
      });
    });
  });

  describe('isActive', () => {
    describe.each([
      ['a active', 'active', true, true],
      ['a inactive', 'inactive', false, false],
      ['no', 'inactive', undefined, false],
    ])('when %s isActive is informed', (_, __, isActive, expectedValue) => {
      it(`should create a new category ${__}`, async () => {
        // Arrange
        const input = { name: 'category', isActive };

        // Act
        const result = await createCategoryUseCase.execute(input);
        const category = result.value as Category;

        // Assert
        expect(category.isActive).toEqual(expectedValue);
      });
    });
  });

  describe('when a error occurs while creating a category', () => {
    it('should return a failure', async () => {
      // Act
      const result = await createCategoryUseCase.execute({} as CreateCategoryInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });

  describe('when a error occurs while saving a category', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a failure', async () => {
      // Arrange
      jest.spyOn(repository, 'save').mockResolvedValueOnce(fail(new Error()));

      // Act
      const result = await createCategoryUseCase.execute({ name: 'name' });

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });
});
