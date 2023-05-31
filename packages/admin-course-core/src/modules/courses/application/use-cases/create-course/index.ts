import { fail, Result, succeed } from '@admin-cursos/core';
import { Course } from '../../../domain/course';
import { CreateCourseError } from './types/errors';
import { CreateCourseInput } from './types/create-course.input';
import { CoursesMutationRepository } from '../../../infra/repository/courses-mutation-repository';

export class CreateCourseUseCase {
  constructor(private authorsMutationRepository: CoursesMutationRepository) {}

  async execute(props: CreateCourseInput): Promise<Result<CreateCourseError, Course>> {
    const courseResult = Course.Create(props);
    if (courseResult.isFailure()) {
      return fail(courseResult.value);
    }
    const saveResult = await this.authorsMutationRepository.save(courseResult.value);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(courseResult.value);
  }
}
