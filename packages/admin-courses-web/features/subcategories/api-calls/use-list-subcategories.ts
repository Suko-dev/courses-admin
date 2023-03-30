import useSwr from 'swr';
import { ApiCaller } from '../../../providers/axios';
import { PaginatedSubcategory } from '../types';
import { DEFAULT_PAGINATION_VALUES } from '../../../constants/paginations/default-values';
import { LIST_SUBCATEGORIES_URL } from './constants';
import { PaginationInput } from '../../../types';

export function useListSubcategories({
  perPage,
  page,
}: PaginationInput = DEFAULT_PAGINATION_VALUES) {
  return useSwr(
    LIST_SUBCATEGORIES_URL({ page, perPage }),
    ApiCaller.fetch<PaginatedSubcategory>
  );
}
