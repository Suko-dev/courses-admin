import { ApiCaller } from '../../../providers/axios';
import { EDIT_CATEGORY_URL } from './constants';
import { Category } from '../types';

export async function editCategory(category: Category) {
  await ApiCaller.post(EDIT_CATEGORY_URL(category.code), category);
}
