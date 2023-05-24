import { Author } from '../author';
import { Chance } from 'chance';

type PropsType<T> = T | ((index) => T);

export class AuthorFakerFactory<BuildType extends Author | Author[]> {
  private quantity: number;
  private chance: Chance.Chance;

  private name: PropsType<string> = () => this.chance.word();
  private biography: PropsType<string | undefined>;
  private createdAt: PropsType<Date> = () => this.chance.date();
  private deletedAt: PropsType<Date | null> = null;

  private constructor(quantity = 1) {
    this.quantity = quantity;
    this.chance = new Chance();
  }

  static aAuthor() {
    return new AuthorFakerFactory<Author>();
  }

  static manyAuthors(quantity = 1) {
    return new AuthorFakerFactory<Author[]>(quantity);
  }

  build(): BuildType {
    const entities = new Array(this.quantity)
      .fill(undefined)
      .map((_, index) =>
        Author.Create({
          name: this.callFunction('name', index),
          createdAt: this.callFunction('createdAt', index),
          deletedAt: this.callFunction('deletedAt', index),
          biography: this.callFunction('biography', index),
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

  withBiography(biography: PropsType<string | undefined>) {
    this.biography = biography;
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
