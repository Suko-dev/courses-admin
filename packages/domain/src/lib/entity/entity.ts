import { UniqueId } from '../id';

export abstract class Entity<Props = undefined> {
  protected _props: Props;

  protected readonly _id: UniqueId;

  protected constructor(id: UniqueId) {
    this._id = id;
  }

  get id(): string {
    return this._id.value;
  }

  get uniqueId() {
    return this._id;
  }
}
