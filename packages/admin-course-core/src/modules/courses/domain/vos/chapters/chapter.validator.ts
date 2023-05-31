import { FieldErrors, ValidatorFields } from '@admin-cursos/core';
import {
  IsDate,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  validateSync,
  ValidationError,
} from 'class-validator';
import { Lesson } from './lesson';

export class ChapterValidationProps {
  @IsString()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsInstance(Lesson, { each: true })
  lessons?: Lesson[];

  @IsDate()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  constructor(props: Partial<ChapterValidationProps>) {
    this.id = props.id;
    this.name = props.name;
    this.lessons = props.lessons;
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
  }
}

export class ChapterValidator implements ValidatorFields {
  errors: FieldErrors;

  isValid(data: ChapterValidationProps): boolean {
    const propsToValidate = new ChapterValidationProps(data);
    const errors = validateSync(propsToValidate);

    if (errors.length) {
      this.errors = {};
      buildValidationErrors(errors, this.errors);
    }

    return !errors.length;
  }
}

function buildValidationErrors(errors: ValidationError[], fieldErrors: FieldErrors): void {
  errors.forEach((error: ValidationError) => {
    const field = error.property;
    if (error.constraints) {
      fieldErrors[field] = Object.values(error.constraints);
    } else {
      if (error.children) {
        fieldErrors[field] = {};
        buildValidationErrors(error.children, fieldErrors[field] as FieldErrors);
      }
    }
  });
}
