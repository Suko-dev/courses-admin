import { CreateCourseUseCase } from '../index';
import { CoursesMutationRepository } from '../../../../infra/repository/courses-mutation-repository';
import { InMemoryCoursesMutationRepository } from '../../../../infra/repository/in-memory-courses-mutation-repository';
import { Course } from '../../../../domain/course';
import { CreateCourseInput } from '../types/create-course.input';
import { fail } from '@admin-cursos/core';

describe('CreateCourseUseCase Unit Test', () => {
  let createCourseUseCase: CreateCourseUseCase;
  let repository: CoursesMutationRepository;
  const validInput: CreateCourseInput = {
    name: 'Como não ser um coach',
    authors: ['Eu'],
    category: 'ctg_geral',
    subcategories: ['sctg_palestra'],
  };

  beforeEach(() => {
    repository = new InMemoryCoursesMutationRepository();
    createCourseUseCase = new CreateCourseUseCase(repository);
  });

  describe('when a valid course input is informed', () => {
    it('should create a new course', async () => {
      // Act
      const result = await createCourseUseCase.execute(validInput);
      const course = result.value as Course;

      // Assert
      expect(result.isSuccess()).toBeTruthy();
      expect(course).toBeInstanceOf(Course);
    });
  });

  describe('when a error occurs while creating a subcategory', () => {
    it('should return a failure', async () => {
      // Act
      const result = await createCourseUseCase.execute({} as CreateCourseInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });

  describe('when a error occurs while saving a subcategory', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a failure', async () => {
      // Arrange
      jest.spyOn(repository, 'save').mockResolvedValueOnce(fail(new Error()));

      // Act
      const result = await createCourseUseCase.execute(validInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });
});
