import { ChapterFakerFactory } from './chapter-faker-factory';
import { Lesson } from '../lesson';
import { Chapter } from '../chapter';

describe('CourseFakeFactory Unit Test', () => {
  describe('Single fake', () => {
    let faker: ChapterFakerFactory<Chapter>;

    beforeEach(() => {
      faker = ChapterFakerFactory.aChapter();
    });

    describe('id', () => {
      it('should create a random id', () => {
        // Act
        const chapter = faker.build();

        // Assert
        expect(chapter.value.id).toBeDefined();
      });

      it('should keep a given id', () => {
        // Act
        const chapter = faker.withId('8fc05b0a-c251-41a2-bde8-4a938a086fc9').build();

        // Assert
        expect(chapter.value.id).toEqual('8fc05b0a-c251-41a2-bde8-4a938a086fc9');
      });

      it('should use a factory id', () => {
        // Act
        const chapter = faker.withId(() => `f80f0c0d-e1fe-4c8b-8bfc-b999990a4529`).build();

        // Assert
        expect(chapter.value.id).toEqual('f80f0c0d-e1fe-4c8b-8bfc-b999990a4529');
      });
    });

    describe('name', () => {
      it('should create a random name', () => {
        // Act
        const chapter = faker.build();

        // Assert
        expect(chapter.value.name).toBeDefined();
      });

      it('should keep a given name', () => {
        // Act
        const lesson = faker.withName('jão').build();

        // Assert
        expect(lesson.value.name).toEqual('jão');
      });

      it('should use a factory name', () => {
        // Act
        const lesson = faker.withName((index) => `jão ${index}`).build();

        // Assert
        expect(lesson.value.name).toEqual('jão 0');
      });
    });

    describe('lesson', () => {
      it('should keep a given lesson', () => {
        // Arrange
        const lesson = new Lesson();

        // Act
        const chapter = faker.withLesson(lesson).build();

        // Assert
        expect(chapter.value.lessons[0]).toEqual(lesson);
      });

      it('should use a factory lesson', () => {
        // Act
        const chapter = faker.withLesson((index) => new Lesson({ id: index.toString() })).build();

        // Assert
        expect(chapter.value.lessons[0]).toMatchObject({ id: '0' });
      });
    });

    describe('lessons', () => {
      it('should keep a bunch of lessons', () => {
        // Arrange
        const lesson1 = new Lesson({ id: '1' });
        const lesson2 = new Lesson({ id: '2' });

        // Act
        const chapter = faker.withLessons([lesson1, lesson2]).build();

        // Assert
        expect(chapter.value.lessons[0]).toEqual(lesson1);
        expect(chapter.value.lessons[1]).toEqual(lesson2);
        expect(chapter.value.lessons).toHaveLength(2);
      });

      it('should use a factory lesson', () => {
        // Act
        const chapter = faker
          .withLessons((index) => [new Lesson({ id: index.toString() })])
          .build();

        // Assert
        expect(chapter.value.lessons[0]).toMatchObject({ id: '0' });
      });
    });

    describe('createdAt', () => {
      it('should create a random creationDate', () => {
        // Act
        const lesson = faker.build();

        // Assert
        expect(lesson.value.createdAt).toBeInstanceOf(Date);
      });

      it('should keep a given creationDate', () => {
        const date = new Date();
        // Act
        const lesson = faker.withCreationDate(date).build();

        // Assert
        expect(lesson.value.createdAt).toEqual(date);
      });

      it('should use a factory creationDate', () => {
        // Act
        const lesson = faker.withCreationDate((index) => new Date(index)).build();

        // Assert
        expect(lesson.value.createdAt).toEqual(new Date(0));
      });
    });
  });

  describe('Bulk build', () => {
    let faker: ChapterFakerFactory<Chapter[]>;

    beforeEach(() => {
      faker = ChapterFakerFactory.manyChapters(5);
    });

    it('should create a given number of chapters', () => {
      // Act
      const chapters = faker.build();

      // Assert
      expect(chapters).toHaveLength(5);
    });

    it('should pass array index on name function', () => {
      // Act
      const chapters = faker.withName((index) => `Jão ${index}`).build();

      // Assert
      chapters.forEach((lesson, index) => {
        expect(lesson.value.name).toEqual(`Jão ${index}`);
      });
    });
  });
});
