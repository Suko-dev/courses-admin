import { FieldErrors, ValidatorFields } from '@admin-cursos/core';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';

export class CourseValidationProps {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  subcategories?: string[];

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  authors?: string[];

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  releaseDate?: Date;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  constructor(props: Partial<CourseValidationProps>) {
    this.name = props.name;
    this.category = props.category;
    this.subcategories = props.subcategories;
    this.authors = props.authors;
    this.releaseDate = props.releaseDate;
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
  }
}

export class CourseValidator implements ValidatorFields {
  errors: FieldErrors;

  isValid(data: CourseValidationProps): boolean {
    const propsToValidate = new CourseValidationProps(data);
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
