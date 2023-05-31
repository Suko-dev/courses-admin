import { CoursesMutationRepository } from './courses-mutation-repository';
import { Course } from '../../domain/course';
import { Result, succeed } from '@admin-cursos/core';

export class InMemoryCoursesMutationRepository implements CoursesMutationRepository {
  private courses: Course[] = [];

  async save(course: Course | Course[]): Promise<Result<Error, void>> {
    if (!Array.isArray(course)) {
      course = [course];
    }
    this.courses.push(...course);

    return succeed();
  }
}
