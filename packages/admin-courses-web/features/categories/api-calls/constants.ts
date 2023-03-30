export const DELETE_CATEGORY_URL = (id: string): string =>
  `categories/delete/${id}`;

export const LIST_CATEGORIES_URL = ({ page, perPage }): string =>
  `categories?page=${page}&per_page=${perPage}`;

export const EDIT_CATEGORY_URL = (code: string): string =>
  `categories/edit/${code}`;

export const GET_CATEGORY_URL = (code: string): string => `categories/${code}`;

export const CREATE_CATEGORY_URL = 'categories/create';
