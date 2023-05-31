import { Course } from '../course';
import { Chance } from 'chance';

type PropsType<T> = T | ((index) => T);

export class CourseFakerFactory<BuildType extends Course | Course[]> {
  private quantity: number;
  private chance: Chance.Chance;

  private name: PropsType<string> = () => this.chance.word();
  private authors: PropsType<string[]> = () => [this.chance.word()];
  private category: PropsType<string> = () => this.chance.word();
  private releaseDate: PropsType<Date> = () => this.chance.date();
  private subcategories: PropsType<string[]> = () => [this.chance.word()];
  private createdAt: PropsType<Date> = () => this.chance.date();
  private deletedAt: PropsType<Date | null> = null;

  private constructor(quantity = 1) {
    this.quantity = quantity;
    this.chance = new Chance();
  }

  static aCourse() {
    return new CourseFakerFactory<Course>();
  }

  static manyCourses(quantity = 1) {
    return new CourseFakerFactory<Course[]>(quantity);
  }

  build(): BuildType {
    const entities = new Array(this.quantity)
      .fill(undefined)
      .map((_, index) =>
        Course.Create({
          name: this.callFunction('name', index),
          authors: this.callFunction('authors', index),
          category: this.callFunction('category', index),
          releaseDate: this.callFunction('releaseDate', index),
          subcategories: this.callFunction('subcategories', index),
          createdAt: this.callFunction('createdAt', index),
          deletedAt: this.callFunction('deletedAt', index),
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

  withCreationDate(createdAt: PropsType<Date>) {
    this.createdAt = createdAt;
    return this;
  }

  private callFunction(property: string, index: number) {
    return typeof this[property] === 'function' ? this[property](index) : this[property];
  }
}
