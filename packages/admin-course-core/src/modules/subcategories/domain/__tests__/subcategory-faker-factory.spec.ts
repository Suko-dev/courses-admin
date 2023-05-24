import { SubcategoryFakerFactory } from './subcategory-faker-factory';
import { Subcategory } from '../subcategory';

describe('SubcategoryFakeFactory Unit Test', () => {
  describe('Single fake', () => {
    let faker: SubcategoryFakerFactory<Subcategory>;

    beforeEach(() => {
      faker = SubcategoryFakerFactory.aCategory();
    });

    describe('name', () => {
      it('should create a random name', () => {
        // Act
        const subcategory = faker.build();

        // Assert
        expect(subcategory.name).toBeDefined();
      });

      it('should keep a given name', () => {
        // Act
        const subcategory = faker.withName('category').build();

        // Assert
        expect(subcategory.name).toEqual('category');
      });

      it('should use a factory name', () => {
        // Act
        const subcategory = faker.withName((index) => `category ${index}`).build();

        // Assert
        expect(subcategory.name).toEqual('category 0');
      });
    });

    describe('mainCategory', () => {
      it('should create a random mainCategory', () => {
        // Act
        const subcategory = faker.build();

        // Assert
        expect(subcategory.mainCategory).toBeDefined();
      });

      it('should keep a given mainCategory', () => {
        // Act
        const subcategory = faker.witMainCategory('subcategory').build();

        // Assert
        expect(subcategory.mainCategory).toEqual('subcategory');
      });

      it('should use a factory mainCategory', () => {
        // Act
        const subcategory = faker.witMainCategory((index) => `subcategory ${index}`).build();

        // Assert
        expect(subcategory.mainCategory).toEqual('subcategory 0');
      });
    });

    describe('description', () => {
      it('should create without a default description', () => {
        // Act
        const subcategory = faker.build();

        // Assert
        expect(subcategory.description).toBeNull();
      });

      it('should keep a given description', () => {
        // Act
        const subcategory = faker.withDescription('this is a description').build();

        // Assert
        expect(subcategory.description).toEqual('this is a description');
      });

      it('should use a factory description', () => {
        // Act
        const subcategory = faker.withDescription((index) => `some description ${index}`).build();

        // Assert
        expect(subcategory.description).toEqual('some description 0');
      });
    });

    describe('code', () => {
      it('should create a random code', () => {
        // Act
        const subcategory = faker.build();

        // Assert
        expect(subcategory.code).toBeDefined();
        expect(subcategory.code.slice(0, 4)).toEqual('ctg_');
      });

      it('should keep a given code', () => {
        // Act
        const subcategory = faker.withCode('fakeCode').build();

        // Assert
        expect(subcategory.code).toEqual('fakeCode');
      });

      it('should use a factory code', () => {
        // Act
        const subcategory = faker.withCode((index) => `ctg_${index}`).build();

        // Assert
        expect(subcategory.code).toEqual('ctg_0');
      });
    });

    describe('isActive', () => {
      it('should create an active subcategory by default', () => {
        // Act
        const subcategory = faker.build();

        // Assert
        expect(subcategory.isActive).toBeTruthy();
      });

      it('should create an inactive subcategory', () => {
        // Act
        const subcategory = faker.inactive().build();

        // Assert
        expect(subcategory.isActive).toBeFalsy();
      });

      it('should use a factory activation', () => {
        // Act
        const subcategory = faker.withActiveFactory((index) => index % 2 === 0).build();

        // Assert
        expect(subcategory.isActive).toBeTruthy();
      });
    });

    describe('createdAt', () => {
      it('should create a random creationDate', () => {
        // Act
        const subcategory = faker.build();

        // Assert
        expect(subcategory.createdAt).toBeInstanceOf(Date);
      });

      it('should keep a given creationDate', () => {
        const date = new Date();
        // Act
        const subcategory = faker.withCreationDate(date).build();

        // Assert
        expect(subcategory.createdAt).toEqual(date);
      });

      it('should use a factory creationDate', () => {
        // Act
        const subcategory = faker.withCreationDate((index) => new Date(index)).build();

        // Assert
        expect(subcategory.createdAt).toEqual(new Date(0));
      });
    });
  });

  describe('Bulk build', () => {
    let faker: SubcategoryFakerFactory<Subcategory[]>;

    beforeEach(() => {
      faker = SubcategoryFakerFactory.manyCategories(5);
    });

    it('should create a given number of categories', () => {
      // Act
      const subcategories = faker.build();

      // Assert
      expect(subcategories).toHaveLength(5);
    });

    it('should pass array index on name function', () => {
      // Act
      const subcategories = faker.withName((index) => `category ${index}`).build();

      // Assert
      subcategories.forEach((subcategory, index) => {
        expect(subcategory.name).toEqual(`category ${index}`);
      });
    });

    it('should pass array index on description function', () => {
      // Act
      const subcategories = faker.withDescription((index) => `category ${index}`).build();

      // Assert
      subcategories.forEach((subcategory, index) => {
        expect(subcategory.description).toEqual(`category ${index}`);
      });
    });

    it('should pass array index on code function', () => {
      // Act
      const subcategories = faker.withCode((index) => `ctg_${index}`).build();

      // Assert
      subcategories.forEach((subcategory, index) => {
        expect(subcategory.code).toEqual(`ctg_${index}`);
      });
    });
  });
});
