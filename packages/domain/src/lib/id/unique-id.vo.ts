import ValueObject from '../value-object/value-object';

export abstract class UniqueId<
  Value extends string = string
> extends ValueObject<Value> {
  equals(uniqueId: unknown): boolean {
    if (uniqueId) {
      try {
        return uniqueId['_value'] === this._value;
      } catch (e) {
        return false;
      }
    }

    return false;
  }
}
