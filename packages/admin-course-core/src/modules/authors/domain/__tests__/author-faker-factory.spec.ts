import { AuthorFakerFactory } from './author-faker-factory';
import { Author } from '../author';

describe('AuthorFakeFactory Unit Test', () => {
  describe('Single fake', () => {
    let faker: AuthorFakerFactory<Author>;

    beforeEach(() => {
      faker = AuthorFakerFactory.aAuthor();
    });

    describe('name', () => {
      it('should create a random name', () => {
        // Act
        const author = faker.build();

        // Assert
        expect(author.name).toBeDefined();
      });

      it('should keep a given name', () => {
        // Act
        const author = faker.withName('jão').build();

        // Assert
        expect(author.name).toEqual('jão');
      });

      it('should use a factory name', () => {
        // Act
        const author = faker.withName((index) => `jão ${index}`).build();

        // Assert
        expect(author.name).toEqual('jão 0');
      });
    });

    describe('biography', () => {
      it('should create without a default biography', () => {
        // Act
        const author = faker.build();

        // Assert
        expect(author.biography).toBeNull();
      });

      it('should keep a given biography', () => {
        // Act
        const author = faker.withBiography('this is a biography').build();

        // Assert
        expect(author.biography).toEqual('this is a biography');
      });

      it('should use a factory biography', () => {
        // Act
        const author = faker.withBiography((index) => `some biography ${index}`).build();

        // Assert
        expect(author.biography).toEqual('some biography 0');
      });
    });

    describe('createdAt', () => {
      it('should create a random creationDate', () => {
        // Act
        const author = faker.build();

        // Assert
        expect(author.createdAt).toBeInstanceOf(Date);
      });

      it('should keep a given creationDate', () => {
        const date = new Date();
        // Act
        const author = faker.withCreationDate(date).build();

        // Assert
        expect(author.createdAt).toEqual(date);
      });

      it('should use a factory creationDate', () => {
        // Act
        const author = faker.withCreationDate((index) => new Date(index)).build();

        // Assert
        expect(author.createdAt).toEqual(new Date(0));
      });
    });
  });

  describe('Bulk build', () => {
    let faker: AuthorFakerFactory<Author[]>;

    beforeEach(() => {
      faker = AuthorFakerFactory.manyAuthors(5);
    });

    it('should create a given number of authors', () => {
      // Act
      const authors = faker.build();

      // Assert
      expect(authors).toHaveLength(5);
    });

    it('should pass array index on name function', () => {
      // Act
      const authors = faker.withName((index) => `Jão ${index}`).build();

      // Assert
      authors.forEach((author, index) => {
        expect(author.name).toEqual(`Jão ${index}`);
      });
    });

    it('should pass array index on biography function', () => {
      // Act
      const authors = faker.withBiography((index) => `biography ${index}`).build();

      // Assert
      authors.forEach((author, index) => {
        expect(author.biography).toEqual(`biography ${index}`);
      });
    });
  });
});
