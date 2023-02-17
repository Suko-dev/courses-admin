import { Entity, UniqueUuid } from '@admin-cursos/domain';
import { CategoryId } from './category-id.vo';
import { fail, Result, succeed } from '@admin-cursos/core';
import { CategoryValidator } from './category.validator';

export interface CategoryProps {
  name: string;
  description: string | null;
  createdAt: Date;
  isActive: boolean;
  code: string;
  deletedAt?: Date;
}

export interface CreateCategoryProps {
  name: string;
  description?: string;
  createdAt?: Date;
  isActive?: boolean;
  code?: string;
  deletedAt?: Date;
}

export class Category extends Entity<CategoryProps> {
  protected constructor(props: CreateCategoryProps, id: UniqueUuid) {
    super(id);
    this._props = {
      name: props.name,
      description: props.description ?? null,
      isActive: props.isActive ?? false,
      createdAt: props.createdAt ?? new Date(),
      code: `ctg_${props.name}`,
      deletedAt: props.deletedAt,
    };
  }

  get name(): string {
    return this._props.name;
  }

  get description(): string | null {
    return this._props.description;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get isActive(): boolean {
    return this._props.isActive;
  }

  get code(): string {
    return this._props.code;
  }

  static Create(
    props: CreateCategoryProps,
    id?: CategoryId
  ): Result<Error, Category> {
    const categoryId = this.getCategoryId(id);

    const category = new Category(props, categoryId);

    const validation = category.validate();
    if (validation.isFailure()) {
      return fail(validation.value);
    }

    return succeed(category);
  }

  private static getCategoryId(id?: CategoryId): CategoryId {
    if (id) {
      return id;
    }

    return <CategoryId>CategoryId.create().value;
  }

  setDescription(value: string) {
    this._props.description = value ?? null;
  }

  activate() {
    this._props.isActive = true;
  }

  deactivate() {
    this._props.isActive = false;
  }

  private validate() {
    const validator = new CategoryValidator();
    const isValid = validator.isValid(this._props);
    if (isValid) {
      return succeed();
    }
    return fail(new Error(JSON.stringify(validator.errors)));
  }
}
