export type FieldErrors = {
  [field: string]: string[] | FieldErrors;
};

export interface ValidatorFields {
  errors: FieldErrors;

  isValid(data: unknown): boolean;
}
