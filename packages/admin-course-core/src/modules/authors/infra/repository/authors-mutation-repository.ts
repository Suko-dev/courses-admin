import { Author } from '../../domain/author';
import { Result } from '@admin-cursos/core';

export interface AuthorsMutationRepository {
  save: (author: Author | Author[]) => Promise<Result<Error, void>>;
}
