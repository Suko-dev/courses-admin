import { AuthorsMutationRepository } from './authors-mutation-repository';
import { Author } from '../../domain/author';
import { Result, succeed } from '@admin-cursos/core';

export class InMemoryAuthorsMutationRepository implements AuthorsMutationRepository {
  private authors: Author[] = [];

  async save(author: Author | Author[]): Promise<Result<Error, void>> {
    if (!Array.isArray(author)) {
      author = [author];
    }
    this.authors.push(...author);

    return succeed();
  }
}
