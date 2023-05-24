import { Entity, UniqueUuid } from '@admin-cursos/domain';
import { AuthorId } from './author-id.vo';
import { fail, Result, succeed } from '@admin-cursos/core';
import { AuthorValidator } from './author.validator';

export interface AuthorProps {
  name: string;
  biography: string | null;
  createdAt: Date;
  deletedAt?: Date;
}

export interface CreateAuthorProps {
  name: string;
  biography?: string;
  createdAt?: Date;
  deletedAt?: Date;
}

export class Author extends Entity<AuthorProps> {
  protected constructor(props: CreateAuthorProps, id: UniqueUuid) {
    super(id);
    this._props = {
      name: props.name,
      biography: props.biography || null,
      createdAt: props.createdAt ?? new Date(),
      deletedAt: props.deletedAt,
    };
  }

  get name(): string {
    return this._props.name;
  }

  get biography(): string | null {
    return this._props.biography;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  static Create(props: CreateAuthorProps, id?: AuthorId): Result<Error, Author> {
    const authorId = this.getAuthorId(id);

    const author = new Author(props, authorId);

    const validation = author.validate();
    if (validation.isFailure()) {
      return fail(validation.value);
    }

    return succeed(author);
  }

  private static getAuthorId(id?: AuthorId): AuthorId {
    if (id) {
      return id;
    }

    return <AuthorId>AuthorId.create().value;
  }

  setName(value: string) {
    const validation = this.validate({ name: value });
    if (validation.isFailure()) {
      return fail(validation.value);
    }
    this._props.name = value;
    return succeed();
  }

  setBiography(value: string) {
    const validation = this.validate({ biography: value });
    if (validation.isFailure()) {
      return fail(validation.value);
    }
    this._props.biography = value ?? null;
    return succeed();
  }

  private validate(newProps?: Partial<AuthorProps>) {
    const validator = new AuthorValidator();
    const isValid = validator.isValid({ ...this._props, ...newProps });
    if (isValid) {
      return succeed();
    }
    return fail(new Error(JSON.stringify(validator.errors)));
  }
}
