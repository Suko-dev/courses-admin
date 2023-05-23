import { CategoryFakerFactory } from './category-faker-factory';
import { Category } from '../category';

describe('CategoryFakeFactory Unit Test', () => {
  describe('Single fake', () => {
    let faker: CategoryFakerFactory<Category>;

    beforeEach(() => {
      faker = CategoryFakerFactory.aCategory();
    });

    describe('name', () => {
      it('should create a random name', () => {
        // Act
        const category = faker.build();

        // Assert
        expect(category.name).toBeDefined();
      });

      it('should keep a given name', () => {
        // Act
        const category = faker.withName('category').build();

        // Assert
        expect(category.name).toEqual('category');
      });

      it('should use a factory name', () => {
        // Act
        const category = faker.withName((index) => `category ${index}`).build();

        // Assert
        expect(category.name).toEqual('category 0');
      });
    });

    describe('description', () => {
      it('should create without a default description', () => {
        // Act
        const category = faker.build();

        // Assert
        expect(category.description).toBeNull();
      });

      it('should keep a given description', () => {
        // Act
        const category = faker.withDescription('this is a description').build();

        // Assert
        expect(category.description).toEqual('this is a description');
      });

      it('should use a factory description', () => {
        // Act
        const category = faker.withDescription((index) => `some description ${index}`).build();

        // Assert
        expect(category.description).toEqual('some description 0');
      });
    });

    describe('code', () => {
      it('should create a random code', () => {
        // Act
        const category = faker.build();

        // Assert
        expect(category.code).toBeDefined();
        expect(category.code.slice(0, 4)).toEqual('ctg_');
      });

      it('should keep a given code', () => {
        // Act
        const category = faker.withCode('fakeCode').build();

        // Assert
        expect(category.code).toEqual('fakeCode');
      });

      it('should use a factory code', () => {
        // Act
        const category = faker.withCode((index) => `ctg_${index}`).build();

        // Assert
        expect(category.code).toEqual('ctg_0');
      });
    });

    describe('isActive', () => {
      it('should create an active category by default', () => {
        // Act
        const category = faker.build();

        // Assert
        expect(category.isActive).toBeTruthy();
      });

      it('should create an inactive category', () => {
        // Act
        const category = faker.inactive().build();

        // Assert
        expect(category.isActive).toBeFalsy();
      });

      it('should use a factory activation', () => {
        // Act
        const category = faker.withActiveFactory((index) => index % 2 === 0).build();

        // Assert
        expect(category.isActive).toBeTruthy();
      });
    });

    describe('createdAt', () => {
      it('should create a random creationDate', () => {
        // Act
        const category = faker.build();

        // Assert
        expect(category.createdAt).toBeInstanceOf(Date);
      });

      it('should keep a given creationDate', () => {
        const date = new Date();
        // Act
        const category = faker.withCreationDate(date).build();

        // Assert
        expect(category.createdAt).toEqual(date);
      });

      it('should use a factory creationDate', () => {
        // Act
        const category = faker.withCreationDate((index) => new Date(index)).build();

        // Assert
        expect(category.createdAt).toEqual(new Date(0));
      });
    });
  });

  describe('Bulk build', () => {
    let faker: CategoryFakerFactory<Category[]>;

    beforeEach(() => {
      faker = CategoryFakerFactory.manyCategories(5);
    });

    it('should create a given number of categories', () => {
      // Act
      const categories = faker.build();

      // Assert
      expect(categories).toHaveLength(5);
    });

    it('should pass array index on name function', () => {
      // Act
      const categories = faker.withName((index) => `category ${index}`).build();

      // Assert
      categories.forEach((category, index) => {
        expect(category.name).toEqual(`category ${index}`);
      });
    });

    it('should pass array index on description function', () => {
      // Act
      const categories = faker.withDescription((index) => `category ${index}`).build();

      // Assert
      categories.forEach((category, index) => {
        expect(category.description).toEqual(`category ${index}`);
      });
    });

    it('should pass array index on code function', () => {
      // Act
      const categories = faker.withCode((index) => `ctg_${index}`).build();

      // Assert
      categories.forEach((category, index) => {
        expect(category.code).toEqual(`ctg_${index}`);
      });
    });
  });
});
