import { UuidTool } from '../uuid-tool';
import { validate } from 'uuid';

describe('UuidTool unit tests', () => {
  it('should generate a new uuid', () => {
    const uuid = UuidTool.generate();

    expect(validate(uuid)).toBeTruthy();
  });

  describe('when validating a uuid', () => {
    const validUuid = 'bd44c9f6-d71a-492c-9566-07c564dcf8f9';

    describe('given the string is a valid uuid', () => {
      it('should return true', () => {
        const isValid = UuidTool.validate(validUuid);

        expect(isValid).toBeTruthy();
      });
    });

    describe.each([
      ['an non uuid string', 'invalidUuid'],
      ['undefined', undefined],
      ['null', null],
    ])('given the string is not a valid uuid', () => {
      it('should return false', () => {
        const isValid = UuidTool.validate('invalidUuid');

        expect(isValid).toBeFalsy();
      });
    });
  });
});
