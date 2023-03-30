export const DELETE_SUBCATEGORY_URL = (id: string): string =>
  `subcategories/delete/${id}`;

export const LIST_SUBCATEGORIES_URL = ({ page, perPage }): string =>
  `subcategories?page=${page}&per_page=${perPage}`;

export const EDIT_SUBCATEGORY_URL = (code: string): string =>
  `subcategories/edit/${code}`;

export const GET_SUBCATEGORY_URL = (code: string): string =>
  `subcategories/${code}`;

export const CREATE_SUBCATEGORY_URL = 'subcategories/create';
