import { Course, CreateCourseProps } from '../course';
import { CourseId } from '../course-id.vo';

describe('Lesson unit test', () => {
  const validProps: CreateCourseProps = {
    name: 'Como não ser um coach',
    authors: ['Eu'],
    category: 'ctg_geral',
    subcategories: ['sctg_palestra'],
  };

  it('should create a new course', () => {
    const course = <Course>Course.Create(validProps).value;
    expect(course).toBeInstanceOf(Course);
    expect(course.name).toEqual(validProps.name);
    expect(course.createdAt).toBeInstanceOf(Date);
    expect(course.category).toEqual(validProps.category);
    expect(course.authors).toEqual(validProps.authors);
    expect(course.subcategories).toEqual(validProps.subcategories);
  });

  describe('when passing an existing id', () => {
    it('should keep that id', () => {
      // Arrange
      const id = CourseId.create().getSuccess() as CourseId;

      // Act
      const course = <Course>Course.Create(validProps, id).value;

      // Assert
      expect(id.equals(course.uniqueId)).toBeTruthy();
    });
  });

  describe('when setting a new course name', () => {
    it('should change its name', () => {
      // Arrange
      const aName = 'this is a name';
      const course = <Course>Course.Create(validProps).value;

      // Act
      course.setName(aName);

      // Assert
      expect(course.name).toEqual(aName);
    });

    describe('when new name is invalid', () => {
      const invalidName = { name: 'notAName' } as unknown as string;

      it('should not change its name', () => {
        // Arrange
        const course = <Course>Course.Create(validProps).value;

        // Act
        course.setName(invalidName);

        // Assert
        expect(course.name).toEqual(validProps.name);
      });

      it('should return a failure', () => {
        // Arrange
        const course = <Course>Course.Create(validProps).value;

        // Act
        const result = course.setName(invalidName);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });
    });
  });
});
