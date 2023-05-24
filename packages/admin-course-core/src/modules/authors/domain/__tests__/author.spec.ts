import { Author } from '../author';
import { AuthorId } from '../author-id.vo';

describe('Subcategory unit test', () => {
  const name = 'Jão';

  it('should create a new author', () => {
    const author = <Author>Author.Create({ name }).value;
    expect(author).toBeInstanceOf(Author);
    expect(author.name).toEqual(name);
    expect(author.createdAt).toBeInstanceOf(Date);
    expect(author.biography).toBeNull();
  });

  describe('when passing an existing id', () => {
    it('should keep that id', () => {
      // Arrange
      const id = AuthorId.create().getSuccess() as AuthorId;

      // Act
      const subcategory = <Author>Author.Create({ name }, id).value;

      // Assert
      expect(id.equals(subcategory.uniqueId)).toBeTruthy();
    });
  });

  describe('when setting a new author name', () => {
    it('should change its name', () => {
      // Arrange
      const newBiography = 'this is a name';
      const author = <Author>Author.Create({ name }).value;

      // Act
      author.setName(newBiography);

      // Assert
      expect(author.name).toEqual(newBiography);
    });

    describe('when new name is invalid', () => {
      const invalidName = { name: 'notAName' } as unknown as string;

      it('should not change its name', () => {
        // Arrange
        const aName = 'jão';
        const author = <Author>Author.Create({ name: aName }).value;

        // Act
        author.setName(invalidName);

        // Assert
        expect(author.name).toEqual(aName);
      });

      it('should return a failure', () => {
        // Arrange
        const author = <Author>Author.Create({ name }).value;

        // Act
        const result = author.setName(invalidName);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });
    });
  });

  describe('when setting a new author biography', () => {
    it('should change its biography', () => {
      // Arrange
      const newBiography = 'this is a biography';
      const author = <Author>Author.Create({ name }).value;

      // Act
      author.setBiography(newBiography);

      // Assert
      expect(author.biography).toEqual(newBiography);
    });

    describe('when new biography is invalid', () => {
      const newBiography = { biography: 'invalidBiography' } as unknown as string;

      it('should not change its biography', () => {
        // Arrange
        const originalBiography = 'this is a biography';
        const author = <Author>Author.Create({ name, biography: originalBiography }).value;

        // Act
        author.setBiography(newBiography);

        // Assert
        expect(author.biography).toEqual(originalBiography);
      });

      it('should return a failure', () => {
        // Arrange
        const author = <Author>Author.Create({ name }).value;

        // Act
        const result = author.setBiography(newBiography);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });
    });
  });
});
