import { Chapter } from '../chapter';
import { Chance } from 'chance';
import { Lesson } from '../lesson';
import { UuidTool } from '@admin-cursos/domain';

type PropsType<T> = T | ((index) => T);

export class ChapterFakerFactory<BuildType extends Chapter | Chapter[]> {
  private quantity: number;
  private chance: Chance.Chance;

  private id: PropsType<string> = () => this.chance.guid({ version: 4 });
  private name: PropsType<string> = () => this.chance.word();

  private lessons: PropsType<Lesson[]> = [];
  private createdAt: PropsType<Date> = () => this.chance.date();
  private deletedAt: PropsType<Date | null> = null;

  private constructor(quantity = 1) {
    this.quantity = quantity;
    this.chance = new Chance();
  }

  static aChapter() {
    return new ChapterFakerFactory<Chapter>();
  }

  static manyChapters(quantity = 1) {
    return new ChapterFakerFactory<Chapter[]>(quantity);
  }

  build(): BuildType {
    const entities = new Array(this.quantity)
      .fill(undefined)
      .map((_, index) =>
        Chapter.Create({
          id: this.callFunction('id', index),
          name: this.callFunction('name', index),
          lessons: this.callFunction('lessons', index),
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

  withId(id: PropsType<string>) {
    const isValidId = typeof id === 'string' ? UuidTool.validate(id) : UuidTool.validate(id(0));

    if (isValidId) {
      this.id = id;
    }

    return this;
  }

  withLessons(lessons: PropsType<Lesson[]>) {
    this.lessons = lessons;
    return this;
  }

  withLesson(lesson: PropsType<Lesson>) {
    this.lessons = typeof lesson === 'function' ? (index) => [lesson(index)] : [lesson];
    return this;
  }

  private callFunction(property: string, index: number) {
    return typeof this[property] === 'function' ? this[property](index) : this[property];
  }
}
