import { Course } from '../../domain/course';
import { Result } from '@admin-cursos/core';

export interface CoursesQueryRepository {
  list: () => Promise<Result<Error, Course[]>>;
}
