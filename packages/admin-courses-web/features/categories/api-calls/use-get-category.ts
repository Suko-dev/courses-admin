import useSwr from 'swr';
import { ApiCaller } from '../../../providers/axios';
import { Category } from '../types';
import { GET_CATEGORY_URL } from './constants';

export function useGetCategory({ code }: { code: string }) {
  return useSwr(GET_CATEGORY_URL(code), ApiCaller.fetch<Category>);
}
