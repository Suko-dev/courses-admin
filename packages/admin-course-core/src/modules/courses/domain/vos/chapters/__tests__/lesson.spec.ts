import { Lesson } from '../lesson';

describe('Lesson unit test', () => {
  const validProps: Partial<Lesson> = {
    name: 'Como não ser um coach',
    videoUrl: 'https://google.com',
    videoThumbnail: 'https://google.com',
    videoDuration: 10,
  };

  it('should create a new lesson', () => {
    const lesson = new Lesson(validProps);
    expect(lesson).toBeInstanceOf(Lesson);
    expect(lesson).toEqual({
      ...validProps,
      id: expect.any(String),
      createdAt: undefined,
      deletedAt: undefined,
    });
  });
});
