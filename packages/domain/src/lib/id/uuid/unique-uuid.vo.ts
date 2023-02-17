import { UniqueId } from '../unique-id.vo';
import { UuidTool } from './';
import { fail, Result, succeed } from '@admin-cursos/core';

export class UniqueUuid extends UniqueId {
  protected constructor(id?: string) {
    super(id ?? UuidTool.generate());
    Object.freeze(this._value);
  }

  static create(id?: string): Result<Error, UniqueUuid> {
    if (id && !UuidTool.validate(id)) {
      return fail(new Error());
    }

    const uniqueId = new UniqueUuid(id);

    return succeed(uniqueId);
  }
}
