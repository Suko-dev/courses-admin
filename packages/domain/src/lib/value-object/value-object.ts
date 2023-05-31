export default abstract class ValueObject<Value = unknown> {
  protected readonly _value: Value;

  protected constructor(value: Value) {
    this._value = Object.freeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if (this.value === null || this.value === undefined) {
      return '';
    }

    if (typeof this.value !== 'object') {
      try {
        return this.value.toString();
      } catch (e) {
        return this.value + '';
      }
    }
    const valueStr = this.value.toString();
    return valueStr === '[object Object]' ? JSON.stringify(this.value) : valueStr;
  };
}
