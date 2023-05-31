import { CourseFakerFactory } from './course-faker-factory';
import { Course } from '../course';

describe('CourseFakeFactory Unit Test', () => {
  describe('Single fake', () => {
    let faker: CourseFakerFactory<Course>;

    beforeEach(() => {
      faker = CourseFakerFactory.aCourse();
    });

    describe('name', () => {
      it('should create a random name', () => {
        // Act
        const course = faker.build();

        // Assert
        expect(course.name).toBeDefined();
      });

      it('should keep a given name', () => {
        // Act
        const course = faker.withName('jão').build();

        // Assert
        expect(course.name).toEqual('jão');
      });

      it('should use a factory name', () => {
        // Act
        const course = faker.withName((index) => `jão ${index}`).build();

        // Assert
        expect(course.name).toEqual('jão 0');
      });
    });

    describe('createdAt', () => {
      it('should create a random creationDate', () => {
        // Act
        const course = faker.build();

        // Assert
        expect(course.createdAt).toBeInstanceOf(Date);
      });

      it('should keep a given creationDate', () => {
        const date = new Date();
        // Act
        const course = faker.withCreationDate(date).build();

        // Assert
        expect(course.createdAt).toEqual(date);
      });

      it('should use a factory creationDate', () => {
        // Act
        const course = faker.withCreationDate((index) => new Date(index)).build();

        // Assert
        expect(course.createdAt).toEqual(new Date(0));
      });
    });
  });

  describe('Bulk build', () => {
    let faker: CourseFakerFactory<Course[]>;

    beforeEach(() => {
      faker = CourseFakerFactory.manyCourses(5);
    });

    it('should create a given number of courses', () => {
      // Act
      const courses = faker.build();

      // Assert
      expect(courses).toHaveLength(5);
    });

    it('should pass array index on name function', () => {
      // Act
      const courses = faker.withName((index) => `Jão ${index}`).build();

      // Assert
      courses.forEach((course, index) => {
        expect(course.name).toEqual(`Jão ${index}`);
      });
    });
  });
});
