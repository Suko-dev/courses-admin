export interface CreateCourseInput {
  name: string;
  category: string;
  subcategories: string[];
  authors: string[];
  releaseDate?: Date;
}
