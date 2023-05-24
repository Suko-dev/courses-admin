import { FieldErrors, ValidatorFields } from '@admin-cursos/core';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';

export class SubcategoryValidationProps {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  mainCategory?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  secondaryCategories?: string[];

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

  constructor(props: Partial<SubcategoryValidationProps>) {
    this.name = props.name;
    this.mainCategory = props.mainCategory;
    this.secondaryCategories = props.secondaryCategories;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.isActive = props.isActive;
    this.code = props.code;
    this.deletedAt = props.deletedAt;
  }
}

export class SubcategoryValidator implements ValidatorFields {
  errors: FieldErrors;

  isValid(data: SubcategoryValidationProps): boolean {
    const propsToValidate = new SubcategoryValidationProps(data);
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
