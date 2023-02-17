export class Failure<L extends Error, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFailure(): this is Failure<L, R> {
    return true;
  }

  isSuccess(): this is Success<L, R> {
    return false;
  }

  getSuccess(): R | null {
    return null;
  }

  getFailure(): L | null {
    return this.value;
  }
}

export class Success<L extends Error, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isFailure(): this is Failure<L, R> {
    return false;
  }

  isSuccess(): this is Success<L, R> {
    return true;
  }

  getSuccess(): R | null {
    return this.value ?? null;
  }

  getFailure(): null {
    return null;
  }
}

export const succeed = <L extends Error, R>(a?: R): Result<L, R> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Success<L, R>(a);
};

export const fail = <L extends Error, R>(l: L): Result<L, R> => {
  return new Failure(l);
};

export type Result<L extends Error, R> = Failure<L, R> | Success<L, R>;
