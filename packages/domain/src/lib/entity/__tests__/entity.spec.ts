import { Entity, UniqueId, UniqueUuid } from '@admin-cursos/domain';

class EntityStub extends Entity {
  static create(id?: string) {
    const uniqueId = UniqueUuid.create(id).getSuccess();
    return new EntityStub(uniqueId as UniqueId);
  }
}

describe('domain', () => {
  const id = 'a74889ca-33e0-4d11-85f2-5d3f003a5ede';

  it('should create a new entity', () => {
    const entity = EntityStub.create();

    expect(entity).toBeInstanceOf(Entity);
  });

  it('should return the entity id', () => {
    const entity = EntityStub.create(id);

    expect(entity.id).toEqual(id);
  });

  it('should return the entity uniqueId', () => {
    const entity = EntityStub.create(id);
    const uniqueId = UniqueUuid.create(id).value as UniqueUuid;

    expect(uniqueId.equals(entity.uniqueId)).toBeTruthy();
  });
});
