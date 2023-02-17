import ValueObject from '../value-object';

class ValueObjectStub extends ValueObject {
  static create(value?: unknown) {
    return new ValueObjectStub(value ?? '');
  }
}

describe('ValueObject unit test', () => {
  it('should create a new ValueObject', () => {
    const valueObject = ValueObjectStub.create();

    expect(valueObject).toBeInstanceOf(ValueObject);
  });

  it('should return its value', () => {
    const value = { value: 'any value' };
    const valueObject = ValueObjectStub.create(value);

    expect(valueObject.value).toEqual(value);
  });

  it('should not be able to change its value', () => {
    const valueObject = ValueObjectStub.create();

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      valueObject['_value'] = 'outraCoisa';
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  describe('should convert to a string', () => {
    const date = new Date();
    const arrange = [
      { received: '', expected: '' },
      { received: 'fake test', expected: 'fake test' },
      { received: 0, expected: '0' },
      { received: 1, expected: '1' },
      { received: 5, expected: '5' },
      { received: [5, 4], expected: '5,4' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: date, expected: date.toString() },
      {
        received: { prop1: 'value1' },
        expected: JSON.stringify({ prop1: 'value1' }),
      },
    ];

    test.each(arrange)(
      'from $received to $expected',
      ({ received, expected }) => {
        const vo = ValueObjectStub.create(received);
        expect(vo + '').toBe(expected);
      }
    );
  });
});
