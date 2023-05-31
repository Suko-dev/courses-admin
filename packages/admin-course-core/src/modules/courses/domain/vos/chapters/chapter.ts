import { ValueObject } from '@admin-cursos/domain';
import { CourseVosId } from './course-vos-id';
import { fail, Result, succeed } from '@admin-cursos/core';
import { ChapterValidator } from './chapter.validator';
import { Lesson } from './lesson';

export interface ChapterProps {
  id: string;
  name: string;
  lessons: Lesson[];
  createdAt: Date;
  deletedAt?: Date;
}

export interface CreateChapterProps {
  id?: string;
  name: string;
  lessons?: Lesson[];
  createdAt?: Date;
  deletedAt?: Date;
}

export class Chapter extends ValueObject<ChapterProps> {
  protected constructor(props: CreateChapterProps & { id: string }) {
    super({
      id: props.id,
      name: props.name,
      lessons: props.lessons || [],
      createdAt: props.createdAt ?? new Date(),
      deletedAt: props.deletedAt,
    });
  }

  static Create(props: CreateChapterProps): Result<Error, Chapter> {
    const chapterId = this.getChapterId(props.id);

    const chapter = new Chapter({ ...props, id: chapterId });

    const validation = chapter.validate();
    if (validation.isFailure()) {
      return fail(validation.value);
    }

    return succeed(chapter);
  }

  private static getChapterId(id?: string): string {
    if (id) {
      return id;
    }

    return CourseVosId.generate();
  }

  private validate() {
    const validator = new ChapterValidator();
    const isValid = validator.isValid(this._value);
    if (isValid) {
      return succeed();
    }
    return fail(new Error(JSON.stringify(validator.errors)));
  }
}
