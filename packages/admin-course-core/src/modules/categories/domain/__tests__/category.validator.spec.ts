import {
  CategoryValidationProps,
  CategoryValidator,
} from '../category.validator';

describe('ExpertValidator unit test', () => {
  let categoryValidator: CategoryValidator;
  let validProps: CategoryValidationProps;

  beforeEach(() => {
    categoryValidator = new CategoryValidator();
    validProps = {
      name: 'A name',
      code: 'a_code',
      createdAt: new Date(),
      isActive: true,
    };
  });

  it('should be defined', () => {
    // Assert
    expect(categoryValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = categoryValidator.isValid(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      categoryValidator.isValid(validProps);

      // Assert
      expect(categoryValidator.errors).not.toBeDefined();
    });
  });

  describe('given an invalid props', () => {
    describe.each([
      ['name', 'an empty string', { name: '' }],
      ['name', 'not a string', { name: 1 }],
      ['name', 'undefined', { name: undefined }],
      ['code', 'an empty string', { code: '' }],
      ['code', 'not a string', { code: 1 }],
      ['code', 'undefined', { code: undefined }],
      ['createdAt', 'undefined', { createdAt: '' }],
      ['createdAt', 'not a date', { createdAt: '10/10/2000' }],
      ['deletedAt', 'not a date', { deletedAt: '10/10/2000' }],
    ])('when %s is %s', (_, __, invalidProp) => {
      it('should return false', () => {
        // Arrange
        const invalidProps = Object.assign(validProps, invalidProp);

        // Act
        const isValid = categoryValidator.isValid(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
