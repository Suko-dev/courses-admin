import { Chapter, CreateChapterProps } from '../chapter';
import { Lesson } from '../lesson';

describe('Chapter unit test', () => {
  const validLesson = new Lesson({
    name: 'Como não ser um coach',
    videoUrl: 'https://google.com',
    videoThumbnail: 'https://google.com',
    videoDuration: 10,
  });

  const validProps: CreateChapterProps = {
    name: 'Como não ser um coach',
    lessons: [validLesson],
  };

  it('should create a new chapter', () => {
    const chapter = Chapter.Create(validProps).getSuccess() as Chapter;
    expect(chapter).toBeInstanceOf(Chapter);
    expect(chapter.value).toEqual({
      ...validProps,
      id: expect.any(String),
      createdAt: expect.any(Date),
      deletedAt: undefined,
      lessons: [validLesson],
    });
  });

  it('should create a lessonless chapter', () => {
    const lessonlessProps = { name: 'Como não ser um coach draft' };

    const chapter = Chapter.Create(lessonlessProps).getSuccess() as Chapter;
    expect(chapter).toBeInstanceOf(Chapter);
    expect(chapter.value).toEqual({
      ...lessonlessProps,
      id: expect.any(String),
      createdAt: expect.any(Date),
      deletedAt: undefined,
      lessons: [],
    });
  });
});
