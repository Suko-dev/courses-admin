import { ApiCaller } from '../../../providers/axios';
import { EDIT_SUBCATEGORY_URL } from './constants';
import { Subcategory } from '../types';

export async function editSubcategory(subcategory: Subcategory) {
  await ApiCaller.post(EDIT_SUBCATEGORY_URL(subcategory.code), subcategory);
}
