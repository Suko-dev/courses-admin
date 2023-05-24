import { SubcategoryValidationProps, SubcategoryValidator } from '../subcategory.validator';

describe('ExpertValidator unit test', () => {
  let subcategoryValidator: SubcategoryValidator;
  let validProps: SubcategoryValidationProps;

  beforeEach(() => {
    subcategoryValidator = new SubcategoryValidator();
    validProps = {
      name: 'A name',
      code: 'a_code',
      mainCategory: 'a_main_category',
      createdAt: new Date(),
      isActive: true,
    };
  });

  it('should be defined', () => {
    // Assert
    expect(subcategoryValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = subcategoryValidator.isValid(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      subcategoryValidator.isValid(validProps);

      // Assert
      expect(subcategoryValidator.errors).not.toBeDefined();
    });
  });

  describe('given an invalid props', () => {
    describe.each([
      ['name', 'an empty string', { name: '' }],
      ['name', 'not a string', { name: 1 }],
      ['name', 'undefined', { name: undefined }],
      ['mainCategory', 'an empty string', { mainCategory: '' }],
      ['mainCategory', 'not a string', { mainCategory: 1 }],
      ['mainCategory', 'undefined', { mainCategory: undefined }],
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
        const isValid = subcategoryValidator.isValid(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
