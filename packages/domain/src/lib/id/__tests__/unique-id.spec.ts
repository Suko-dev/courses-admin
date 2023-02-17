import { UniqueId } from '../';

class UniqueIdStub extends UniqueId {
  static create(id: unknown) {
    return new UniqueIdStub(id);
  }
}

describe('UniqueUuid unit tests', () => {
  describe('when comparing two unique ids', () => {
    const uuid = '8ae06a95-adc8-4204-a5d9-4348ee733eaa';

    describe('given its value is the same', () => {
      it('should return true', () => {
        const uniqueId = UniqueIdStub.create(uuid);
        const anotherUniqueId = UniqueIdStub.create(uuid);

        expect(uniqueId?.equals(anotherUniqueId)).toBeTruthy();
      });
    });

    describe('given its value is different', () => {
      it('should return false', () => {
        const uniqueId = UniqueIdStub.create(uuid);
        const anotherUniqueId = UniqueIdStub.create('otherValue');

        expect(uniqueId?.equals(anotherUniqueId)).toBeFalsy();
      });
    });

    describe('given the other object is not an UniqueUuid', () => {
      it('should return false', () => {
        const uniqueId = UniqueIdStub.create(uuid);
        const anotherUniqueId = '8ae06a95-adc8-4204-a5d9-4348ee733eaa';

        expect(uniqueId?.equals(anotherUniqueId)).toBeFalsy();
      });
    });
  });
});
