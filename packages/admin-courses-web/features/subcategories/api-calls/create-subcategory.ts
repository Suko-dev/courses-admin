import { ApiCaller } from '../../../providers/axios';
import { CREATE_SUBCATEGORY_URL } from './constants';
import { Subcategory } from '../types';

export async function createSubcategory(subcategory: Subcategory) {
  await ApiCaller.post(CREATE_SUBCATEGORY_URL, subcategory);
}
