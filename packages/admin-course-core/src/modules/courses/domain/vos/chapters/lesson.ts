import { CourseVosId } from './course-vos-id';

export class Lesson {
  id: string;
  name: string;
  videoUrl: string;
  videoThumbnail: string;
  videoDuration: number;
  createdAt: Date;
  deletedAt?: Date;

  constructor(props: Partial<Lesson> = {}) {
    const id = this.getLessonId(props.id);
    Object.assign(this, { ...props, id });
  }

  private getLessonId(id?: string): string {
    if (id) {
      return id;
    }

    return CourseVosId.generate();
  }
}
