import { Entity, UniqueUuid } from '@admin-cursos/domain';
import { SubcategoryId } from './subcategory-id.vo';
import { fail, Result, succeed } from '@admin-cursos/core';
import { SubcategoryValidator } from './subcategory.validator';

export interface CategoryProps {
  name: string;
  mainCategory: string;
  secondaryCategories?: string[];
  description: string | null;
  createdAt: Date;
  isActive: boolean;
  code: string;
  deletedAt?: Date;
}

export interface CreateCategoryProps {
  name: string;
  mainCategory: string;
  secondaryCategories?: string[];
  description?: string;
  createdAt?: Date;
  isActive?: boolean;
  code?: string;
  deletedAt?: Date;
}

export class Subcategory extends Entity<CategoryProps> {
  protected constructor(props: CreateCategoryProps, id: UniqueUuid) {
    super(id);
    this._props = {
      name: props.name,
      mainCategory: props.mainCategory,
      secondaryCategories: props.secondaryCategories ?? [],
      description: props.description ?? null,
      isActive: props.isActive ?? false,
      createdAt: props.createdAt ?? new Date(),
      code: props.code ? props.code : `ctg_${props.name}`,
      deletedAt: props.deletedAt,
    };
  }

  get name(): string {
    return this._props.name;
  }

  get description(): string | null {
    return this._props.description;
  }

  get mainCategory(): string {
    return this._props.mainCategory;
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

  static Create(props: CreateCategoryProps, id?: SubcategoryId): Result<Error, Subcategory> {
    const categoryId = this.getCategoryId(id);

    const category = new Subcategory(props, categoryId);

    const validation = category.validate();
    if (validation.isFailure()) {
      return fail(validation.value);
    }

    return succeed(category);
  }

  private static getCategoryId(id?: SubcategoryId): SubcategoryId {
    if (id) {
      return id;
    }

    return <SubcategoryId>SubcategoryId.create().value;
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
    const validator = new SubcategoryValidator();
    const isValid = validator.isValid(this._props);
    if (isValid) {
      return succeed();
    }
    return fail(new Error(JSON.stringify(validator.errors)));
  }
}
