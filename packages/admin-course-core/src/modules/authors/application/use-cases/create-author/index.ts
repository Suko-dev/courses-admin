import { fail, Result, succeed } from '@admin-cursos/core';
import { Author } from '../../../domain/author';
import { CreateAuthorError } from './types/errors';
import { CreateAuthorInput } from './types/create-author.input';
import { AuthorsMutationRepository } from '../../../infra/repository/authors-mutation-repository';

export class CreateAuthorUseCase {
  constructor(private authorsMutationRepository: AuthorsMutationRepository) {}

  async execute(props: CreateAuthorInput): Promise<Result<CreateAuthorError, Author>> {
    const authorResult = Author.Create(props);
    if (authorResult.isFailure()) {
      return fail(authorResult.value);
    }
    const saveResult = await this.authorsMutationRepository.save(authorResult.value);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(authorResult.value);
  }
}
