import { ChapterValidationProps, ChapterValidator } from '../chapter.validator';
import { Lesson } from '../lesson';

describe('ChapterValidator unit test', () => {
  let chapterValidator: ChapterValidator;
  let validProps: ChapterValidationProps;

  beforeEach(() => {
    chapterValidator = new ChapterValidator();
    validProps = {
      id: 'd84b6f9d-d014-4ce3-9ac5-d275c1f6dc64',
      name: 'A name',
      createdAt: new Date(),
      lessons: [new Lesson({ name: 'Aula 1' })],
    };
  });

  it('should be defined', () => {
    // Assert
    expect(chapterValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = chapterValidator.isValid(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      chapterValidator.isValid(validProps);

      // Assert
      expect(chapterValidator.errors).not.toBeDefined();
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
        const isValid = chapterValidator.isValid(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
