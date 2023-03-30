import { apiSlice } from '../../../providers/redux';
import { Category, PaginatedCategory } from '../types';
import {
  CategoryParams,
  Result,
} from '../../../pages/api/categories/category-mock';

const endpointUrl = '/categories';

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append('page', params.page.toString());
  }

  if (params.perPage) {
    query.append('per_page', params.perPage.toString());
  }

  if (params.search) {
    query.append('search', params.search);
  }

  if (params.isActive) {
    query.append('is_active', params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = '' }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation({ id }) {
  return {
    url: `${endpointUrl}/delete/${id}`,
    method: 'DELETE',
  };
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: 'POST', body: category };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/edit/${category.id}`,
    method: 'PUT',
    body: category,
  };
}

function getCategory({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<PaginatedCategory, CategoryParams>({
      query: getCategories,
      providesTags: ['Categories'],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ['Categories'],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ['Categories'],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApiSlice;
