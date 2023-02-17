import { Category } from '../category';

describe('Category unit test', () => {
  const name = 'category';

  it('should create a new category', () => {
    const category = <Category>Category.Create({ name }).value;

    expect(category).toBeInstanceOf(Category);
    expect(category.name).toEqual(name);
    expect(category.isActive).toBeFalsy();
    expect(category.code).toEqual('ctg_category');
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.description).toBeNull();
  });

  describe('when seting a new category description', () => {
    it('should change its description', () => {
      const newDescriptino = 'this is a description';
      const category = <Category>Category.Create({ name }).value;

      category.setDescription(newDescriptino);

      expect(category.description).toEqual(newDescriptino);
    });
  });

  describe('when activating a category', () => {
    describe('given it is inactive', () => {
      it('should set isActive to true', () => {
        const category = <Category>Category.Create({ name }).value;

        category.activate();

        expect(category.isActive).toBeTruthy();
      });
    });

    describe('given it is already active', () => {
      it('should do nothing', () => {
        const category = <Category>(
          Category.Create({ name, isActive: true }).value
        );

        category.activate();

        expect(category.isActive).toBeTruthy();
      });
    });
  });

  describe('when deactivating a category', () => {
    describe('given it is active', () => {
      it('should set isActive to false', () => {
        const category = <Category>(
          Category.Create({ name, isActive: true }).value
        );

        category.deactivate();

        expect(category.isActive).toBeFalsy();
      });
    });

    describe('given it is already inactive', () => {
      it('should do nothing', () => {
        const category = <Category>(
          Category.Create({ name, isActive: true }).value
        );

        category.deactivate();

        expect(category.isActive).toBeFalsy();
      });
    });
  });
});
