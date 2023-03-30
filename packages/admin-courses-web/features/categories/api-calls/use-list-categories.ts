import useSwr from 'swr';
import { ApiCaller } from '../../../providers/axios';
import { PaginatedCategory } from '../types';
import { DEFAULT_PAGINATION_VALUES } from '../../../constants/paginations/default-values';
import { LIST_CATEGORIES_URL } from './constants';
import { PaginationInput } from '../../../types';

export function useListCategories({
  perPage,
  page,
}: PaginationInput = DEFAULT_PAGINATION_VALUES) {
  return useSwr(
    LIST_CATEGORIES_URL({ page, perPage }),
    ApiCaller.fetch<PaginatedCategory>
  );
}
