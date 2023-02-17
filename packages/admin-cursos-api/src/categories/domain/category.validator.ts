import { FieldErrors, ValidatorFields } from '@admin-cursos/core';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';

export class CategoryValidationProps {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  @IsBoolean()
  isActive?: boolean;

  // todo: validador de prefixo do código
  @IsString()
  @IsNotEmpty()
  code?: string;

  constructor(props: Partial<CategoryValidationProps>) {
    this.name = props.name;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.isActive = props.isActive;
    this.code = props.code;
    this.deletedAt = props.deletedAt;
  }
}

export class CategoryValidator implements ValidatorFields {
  errors: FieldErrors;

  isValid(data: CategoryValidationProps): boolean {
    const propsToValidate = new CategoryValidationProps(data);
    const errors = validateSync(propsToValidate);

    if (errors.length) {
      this.errors = {};
      buildValidationErrors(errors, this.errors);
    }

    return !errors.length;
  }
}

function buildValidationErrors(
  errors: ValidationError[],
  fieldErrors: FieldErrors
): void {
  errors.forEach((error: ValidationError) => {
    const field = error.property;
    if (error.constraints) {
      fieldErrors[field] = Object.values(error.constraints);
    } else {
      if (error.children) {
        fieldErrors[field] = {};
        buildValidationErrors(
          error.children,
          fieldErrors[field] as FieldErrors
        );
      }
    }
  });
}
