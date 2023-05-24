import { Subcategory } from '../subcategory';
import { Chance } from 'chance';

type PropsType<T> = T | ((index) => T);

export class SubcategoryFakerFactory<BuildType extends Subcategory | Subcategory[]> {
  private quantity: number;
  private chance: Chance.Chance;

  private name: PropsType<string> = () => this.chance.word();
  private mainCategory: PropsType<string> = () => this.chance.word();
  private description: PropsType<string | undefined>;
  private createdAt: PropsType<Date> = () => this.chance.date();
  private isActive: PropsType<boolean> = true;
  private code: PropsType<string>;
  private deletedAt: PropsType<Date | null> = null;

  private constructor(quantity = 1) {
    this.quantity = quantity;
    this.chance = new Chance();
  }

  static aCategory() {
    return new SubcategoryFakerFactory<Subcategory>();
  }

  static manyCategories(quantity = 1) {
    return new SubcategoryFakerFactory<Subcategory[]>(quantity);
  }

  build(): BuildType {
    const entities = new Array(this.quantity)
      .fill(undefined)
      .map((_, index) =>
        Subcategory.Create({
          name: this.callFunction('name', index),
          mainCategory: this.callFunction('mainCategory', index),
          code: this.callFunction('code', index),
          createdAt: this.callFunction('createdAt', index),
          isActive: this.callFunction('isActive', index),
          deletedAt: this.callFunction('deletedAt', index),
          description: this.callFunction('description', index),
        }).getSuccess()
      )
      .filter((entity) => !!entity);
    if (entities.length === 1) {
      return entities[0] as BuildType;
    }
    return entities as BuildType;
  }

  withName(name: PropsType<string>) {
    this.name = name;
    return this;
  }

  witMainCategory(mainCategory: PropsType<string>) {
    this.mainCategory = mainCategory;
    return this;
  }

  withDescription(description: PropsType<string>) {
    this.description = description;
    return this;
  }

  withCode(code: PropsType<string>) {
    this.code = code;
    return this;
  }

  withCreationDate(createdAt: PropsType<Date>) {
    this.createdAt = createdAt;
    return this;
  }

  active() {
    this.isActive = true;
    return this;
  }

  inactive() {
    this.isActive = false;
    return this;
  }

  withActiveFactory(isActive: PropsType<boolean>) {
    this.isActive = isActive;
    return this;
  }

  private callFunction(property: string, index: number) {
    return typeof this[property] === 'function' ? this[property](index) : this[property];
  }
}
