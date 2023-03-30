import { ApiCaller } from '../../../providers/axios';
import { CREATE_CATEGORY_URL } from './constants';
import { Category } from '../types';

export async function createCategory(category: Category) {
  await ApiCaller.post(CREATE_CATEGORY_URL, category);
}
