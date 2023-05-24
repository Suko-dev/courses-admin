export interface CreateSubcategoryInput {
  name: string;
  mainCategory: string;
  secondaryCategories?: string[];
  isActive?: boolean;
  description?: string;
}
