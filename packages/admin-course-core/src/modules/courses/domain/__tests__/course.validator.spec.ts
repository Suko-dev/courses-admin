import { CourseValidationProps, CourseValidator } from '../course.validator';

describe('ChapterValidator unit test', () => {
  let courseValidator: CourseValidator;
  let validProps: CourseValidationProps;

  beforeEach(() => {
    courseValidator = new CourseValidator();
    validProps = {
      name: 'A name',
      category: 'ctg_a_category',
      subcategories: ['sctg_a_subcategory'],
      authors: ['A author'],
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    // Assert
    expect(courseValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = courseValidator.isValid(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      courseValidator.isValid(validProps);

      // Assert
      expect(courseValidator.errors).not.toBeDefined();
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
        const isValid = courseValidator.isValid(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
