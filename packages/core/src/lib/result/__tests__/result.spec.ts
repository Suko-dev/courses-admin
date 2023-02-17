import { fail, Failure, succeed, Success } from '../';

describe('result unit test', () => {
  describe('when a result is an success', () => {
    it('should be able to build a result success without value', () => {
      const success = succeed();

      expect(success).toBeInstanceOf(Success);
      expect(success.isSuccess()).toBeTruthy();
    });

    it('should be able to build a result success with a value', () => {
      const successValue = 'succeed';
      const success = succeed(successValue);

      expect(success).toBeInstanceOf(Success);
      expect(success.isSuccess()).toBeTruthy();
      expect(success.value).toEqual(successValue);
    });

    it('should not fail', () => {
      const success = succeed();

      expect(success).not.toBeInstanceOf(Failure);
      expect(success.isFailure()).toBeFalsy();
    });
  });

  describe('when a result is an success', () => {
    it('build a result failure', () => {
      const failure = fail(new Error());

      expect(failure).toBeInstanceOf(Failure);
      expect(failure.isFailure()).toBeTruthy();
    });

    test('a failure should not succeed', () => {
      const failure = fail(new Error());

      expect(failure).not.toBeInstanceOf(Success);
      expect(failure.isSuccess()).toBeFalsy();
    });

    it('should return its value', () => {
      const error = new Error();
      const failure = fail(error);

      expect(failure.value).toEqual(error);
    });
  });
});
