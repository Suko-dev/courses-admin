import { Author } from '../../domain/author';
import { Result } from '@admin-cursos/core';

export interface AuthorsQueryRepository {
  list: () => Promise<Result<Error, Author[]>>;
}
