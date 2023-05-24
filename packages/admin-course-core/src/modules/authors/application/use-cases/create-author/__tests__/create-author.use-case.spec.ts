import { CreateAuthorUseCase } from '../create-subcategory';
import { AuthorsMutationRepository } from '../../../../infra/repository/authors-mutation-repository';
import { InMemoryAuthorsMutationRepository } from '../../../../infra/repository/in-memory-authors-mutation-repository';
import { Author } from '../../../../domain/author';
import { CreateAuthorInput } from '../types/create-author.input';
import { fail } from '@admin-cursos/core';

describe('CreateAuthorUseCase Unit Test', () => {
  let createAuthorUseCase: CreateAuthorUseCase;
  let repository: AuthorsMutationRepository;

  beforeEach(() => {
    repository = new InMemoryAuthorsMutationRepository();
    createAuthorUseCase = new CreateAuthorUseCase(repository);
  });

  describe('when a valid author input is informed', () => {
    it('should create a new author', async () => {
      // Arrange
      const input = { name: 'jão' };

      // Act
      const result = await createAuthorUseCase.execute(input);
      const author = result.value as Author;

      // Assert
      expect(result.isSuccess()).toBeTruthy();
      expect(author).toBeInstanceOf(Author);
      expect(author.name).toEqual('jão');
    });
  });

  describe('biography', () => {
    describe.each([
      ['a', 'given', 'biography'],
      ['no', 'a null', null],
    ])('when %s description is informed', (_, __, biography) => {
      it(`should create a new author with ${__} biography`, async () => {
        // Arrange
        const input = {
          name: 'jão',
          biography: biography || undefined,
        };

        // Act
        const result = await createAuthorUseCase.execute(input);
        const author = result.value as Author;

        // Assert
        expect(author.biography).toEqual(biography);
      });
    });
  });

  describe('when a error occurs while creating a subcategory', () => {
    it('should return a failure', async () => {
      // Act
      const result = await createAuthorUseCase.execute({} as CreateAuthorInput);

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
      const result = await createAuthorUseCase.execute({
        name: 'jão',
      });

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });
});
