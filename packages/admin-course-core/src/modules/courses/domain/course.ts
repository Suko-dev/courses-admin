import { AggregateRoot } from '@admin-cursos/domain';
import { CourseId } from './course-id.vo';
import { fail, Result, succeed } from '@admin-cursos/core';
import { CourseValidator } from './course.validator';
import { Chapter } from './vos/chapters';

export interface CourseProps {
  name: string;
  category: string;
  subcategories: string[];
  chapters: Chapter[];
  authors: string[];
  releaseDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
}

export interface CreateCourseProps {
  name: string;
  category: string;
  subcategories: string[];
  authors: string[];
  chapters?: Chapter[];
  releaseDate?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

export class Course extends AggregateRoot<CourseProps> {
  protected constructor(props: CreateCourseProps, id: CourseId) {
    super(id);
    this._props = {
      name: props.name,
      category: props.category,
      chapters: props.chapters ?? [],
      subcategories: props.subcategories,
      authors: props.authors,
      releaseDate: props.releaseDate,
      createdAt: props.createdAt ?? new Date(),
      deletedAt: props.deletedAt,
    };
  }

  get name(): string {
    return this._props.name;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get category(): string {
    return this._props.category;
  }

  get subcategories(): string[] {
    return this._props.subcategories;
  }

  get authors(): string[] {
    return this._props.authors;
  }

  get chapters(): Chapter[] {
    return this._props.chapters;
  }

  get releaseDate(): Date | undefined {
    return this._props.releaseDate;
  }

  static Create(props: CreateCourseProps, id?: CourseId): Result<Error, Course> {
    const authorId = this.getCourseId(id);

    const author = new Course(props, authorId);

    const validation = author.validate();
    if (validation.isFailure()) {
      return fail(validation.value);
    }

    return succeed(author);
  }

  private static getCourseId(id?: CourseId): CourseId {
    if (id) {
      return id;
    }

    return <CourseId>CourseId.create().value;
  }

  setName(value: string) {
    const validation = this.validate({ name: value });
    if (validation.isFailure()) {
      return fail(validation.value);
    }
    this._props.name = value;
    return succeed();
  }

  private validate(newProps?: Partial<CourseProps>) {
    const validator = new CourseValidator();
    const isValid = validator.isValid({ ...this._props, ...newProps });
    if (isValid) {
      return succeed();
    }
    return fail(new Error(JSON.stringify(validator.errors)));
  }
}
