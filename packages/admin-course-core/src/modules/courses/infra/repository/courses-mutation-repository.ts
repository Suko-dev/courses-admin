import { Course } from '../../domain/course';
import { Result } from '@admin-cursos/core';

export interface CoursesMutationRepository {
  save: (author: Course | Course[]) => Promise<Result<Error, void>>;
}
