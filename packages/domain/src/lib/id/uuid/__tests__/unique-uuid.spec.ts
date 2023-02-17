import { UniqueUuid } from '../unique-uuid.vo';

describe('UniqueUuid unit tests', () => {
  describe('when creating a new UniqueUuid', () => {
    describe('given no previous uuid is informed', () => {
      it('should create a new UniqueUuid', () => {
        const uniqueId = UniqueUuid.create().getSuccess();

        expect(uniqueId).toBeInstanceOf(UniqueUuid);
      });
    });

    describe('given a previous valid uuid is informed', () => {
      it('should create a new UniqueUuid with informed id', () => {
        const uniqueId = UniqueUuid.create(
          'bd44c9f6-d71a-492c-9566-07c564dcf8f9'
        ).value as UniqueUuid;

        expect(uniqueId).toBeInstanceOf(UniqueUuid);
        expect(uniqueId.value).toEqual('bd44c9f6-d71a-492c-9566-07c564dcf8f9');
      });
    });

    describe('given a previous invalid uuid is informed', () => {
      it('should return an error', () => {
        const uniqueId = UniqueUuid.create('not-an-uuid').value;

        expect(uniqueId).toBeInstanceOf(Error);
      });
    });
  });
});
