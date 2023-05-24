import { CreateSubcategoryUseCase } from '../create-subcategory';
import { SubcategoriesMutationRepository } from '../../../../infra/repository/subcategories-mutation-repository';
import { InMemorySubcategoriesMutationRepository } from '../../../../infra/repository/in-memory-subcategories-mutation-repository';
import { Subcategory } from '../../../../domain/subcategory';
import { CreateSubcategoryInput } from '../types/create-subcategory.input';
import { fail } from '@admin-cursos/core';

describe('CreateSubcategoryUseCase Unit Test', () => {
  let createSubcategoryUseCase: CreateSubcategoryUseCase;
  let repository: SubcategoriesMutationRepository;

  beforeEach(() => {
    repository = new InMemorySubcategoriesMutationRepository();
    createSubcategoryUseCase = new CreateSubcategoryUseCase(repository);
  });

  describe('when a valid category input is informed', () => {
    it('should create a new subcategory', async () => {
      // Arrange
      const input = { name: 'subcategory', mainCategory: 'ctg_category' };

      // Act
      const result = await createSubcategoryUseCase.execute(input);
      const subcategory = result.value as Subcategory;

      // Assert
      expect(result.isSuccess()).toBeTruthy();
      expect(subcategory).toBeInstanceOf(Subcategory);
      expect(subcategory.name).toEqual('subcategory');
    });
  });

  describe('description', () => {
    describe.each([
      ['a', 'given', 'description'],
      ['no', 'a null', null],
    ])('when %s description is informed', (_, __, description) => {
      it(`should create a new subcategory with ${__} description`, async () => {
        // Arrange
        const input = {
          name: 'subcategory',
          mainCategory: 'ctg_subcategory',
          description: description || undefined,
        };

        // Act
        const result = await createSubcategoryUseCase.execute(input);
        const subcategory = result.value as Subcategory;

        // Assert
        expect(subcategory.description).toEqual(description);
      });
    });
  });

  describe('isActive', () => {
    describe.each([
      ['a active', 'active', true, true],
      ['a inactive', 'inactive', false, false],
      ['no', 'inactive', undefined, false],
    ])('when %s isActive is informed', (_, __, isActive, expectedValue) => {
      it(`should create a new subcategory ${__}`, async () => {
        // Arrange
        const input = { name: 'subcategory', mainCategory: 'ctg_category', isActive };

        // Act
        const result = await createSubcategoryUseCase.execute(input);
        const subcategory = result.value as Subcategory;

        // Assert
        expect(subcategory.isActive).toEqual(expectedValue);
      });
    });
  });

  describe('when a error occurs while creating a subcategory', () => {
    it('should return a failure', async () => {
      // Act
      const result = await createSubcategoryUseCase.execute({} as CreateSubcategoryInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });

  describe('when a error occurs while saving a subcategory', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a failure', async () => {
      // Arrange
      jest.spyOn(repository, 'save').mockResolvedValueOnce(fail(new Error()));

      // Act
      const result = await createSubcategoryUseCase.execute({
        name: 'name',
        mainCategory: 'ctg_category',
      });

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });
});
