import { UuidTool } from '@admin-cursos/domain';

export class CourseVosId {
  static generate(id?: string): string {
    if (id && UuidTool.validate(id)) {
      return id;
    }

    return UuidTool.generate();
  }
}
