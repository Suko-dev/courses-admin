import useSwr from 'swr';
import { ApiCaller } from '../../../providers/axios';
import { Subcategory } from '../types';
import { GET_SUBCATEGORY_URL } from './constants';

export function useGetSubcategory({ code }: { code: string }) {
  return useSwr(GET_SUBCATEGORY_URL(code), ApiCaller.fetch<Subcategory>);
}
