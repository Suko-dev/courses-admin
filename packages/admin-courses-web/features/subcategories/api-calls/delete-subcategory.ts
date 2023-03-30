import { ApiCaller } from '../../../providers/axios';
import { DELETE_SUBCATEGORY_URL } from './constants';

export async function deleteSubcategory(id: string) {
  await ApiCaller.post(DELETE_SUBCATEGORY_URL(id));
}
