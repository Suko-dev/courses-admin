import { FieldErrors, ValidatorFields } from '@admin-cursos/core';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';

export class AuthorValidationProps {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  biography?: string | null;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  constructor(props: Partial<AuthorValidationProps>) {
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.biography = props.biography;
    this.deletedAt = props.deletedAt;
  }
}

export class AuthorValidator implements ValidatorFields {
  errors: FieldErrors;

  isValid(data: AuthorValidationProps): boolean {
    const propsToValidate = new AuthorValidationProps(data);
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
