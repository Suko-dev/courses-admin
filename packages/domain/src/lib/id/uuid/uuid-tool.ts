import { v4 as uuidv4, validate } from 'uuid';

export class UuidTool {
  static generate(): string {
    return uuidv4();
  }

  static validate(uuid?: string): boolean {
    return validate(uuid ?? '');
  }
}
