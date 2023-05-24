import { AuthorValidationProps, AuthorValidator } from '../author.validator';

describe('ExpertValidator unit test', () => {
  let authorValidator: AuthorValidator;
  let validProps: AuthorValidationProps;

  beforeEach(() => {
    authorValidator = new AuthorValidator();
    validProps = {
      name: 'A name',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    // Assert
    expect(authorValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = authorValidator.isValid(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      authorValidator.isValid(validProps);

      // Assert
      expect(authorValidator.errors).not.toBeDefined();
    });
  });

  describe('given an invalid props', () => {
    describe.each([
      ['name', 'an empty string', { name: '' }],
      ['name', 'not a string', { name: 1 }],
      ['name', 'undefined', { name: undefined }],
      ['createdAt', 'undefined', { createdAt: '' }],
      ['createdAt', 'not a date', { createdAt: '10/10/2000' }],
      ['deletedAt', 'not a date', { deletedAt: '10/10/2000' }],
    ])('when %s is %s', (_, __, invalidProp) => {
      it('should return false', () => {
        // Arrange
        const invalidProps = Object.assign(validProps, invalidProp);

        // Act
        const isValid = authorValidator.isValid(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
