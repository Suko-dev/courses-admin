import { Subcategory } from '../subcategory';
import { SubcategoryId } from '../subcategory-id.vo';

describe('Subcategory unit test', () => {
  const name = 'subcategory';
  const mainCategory = 'ctg_category';

  it('should create a new subcategory', () => {
    const subcategory = <Subcategory>Subcategory.Create({ name, mainCategory }).value;

    expect(subcategory).toBeInstanceOf(Subcategory);
    expect(subcategory.name).toEqual(name);
    expect(subcategory.isActive).toBeFalsy();
    expect(subcategory.code).toEqual('ctg_subcategory');
    expect(subcategory.createdAt).toBeInstanceOf(Date);
    expect(subcategory.description).toBeNull();
  });

  describe('when passing an existing id', () => {
    it('should keep that id', () => {
      // Arrange
      const id = SubcategoryId.create().getSuccess() as SubcategoryId;

      // Act
      const subcategory = <Subcategory>Subcategory.Create({ name, mainCategory }, id).value;

      // Assert
      expect(id.equals(subcategory.uniqueId)).toBeTruthy();
    });
  });

  describe('when setting a new subcategory description', () => {
    it('should change its description', () => {
      const newDescription = 'this is a description';
      const subcategory = <Subcategory>Subcategory.Create({ name, mainCategory }).value;

      subcategory.setDescription(newDescription);

      expect(subcategory.description).toEqual(newDescription);
    });
  });

  describe('when activating a subcategory', () => {
    describe('given it is inactive', () => {
      it('should set isActive to true', () => {
        const subcategory = <Subcategory>Subcategory.Create({ name, mainCategory }).value;

        subcategory.activate();

        expect(subcategory.isActive).toBeTruthy();
      });
    });

    describe('given it is already active', () => {
      it('should do nothing', () => {
        const subcategory = <Subcategory>(
          Subcategory.Create({ name, mainCategory, isActive: true }).value
        );

        subcategory.activate();

        expect(subcategory.isActive).toBeTruthy();
      });
    });
  });

  describe('when deactivating a subcategory', () => {
    describe('given it is active', () => {
      it('should set isActive to false', () => {
        const subcategory = <Subcategory>(
          Subcategory.Create({ name, mainCategory, isActive: true }).value
        );

        subcategory.deactivate();

        expect(subcategory.isActive).toBeFalsy();
      });
    });

    describe('given it is already inactive', () => {
      it('should do nothing', () => {
        const subcategory = <Subcategory>(
          Subcategory.Create({ name, mainCategory, isActive: true }).value
        );

        subcategory.deactivate();

        expect(subcategory.isActive).toBeFalsy();
      });
    });
  });
});
