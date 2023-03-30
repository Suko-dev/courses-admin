import { CategoryForm } from './category-form';

import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Category } from '../types';
import { editCategory, useGetCategory } from '../api-calls';
import Router from 'next/router';

type EditCategoryProps = {
  code: string;
};

export function EditCategory({ code }: EditCategoryProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setDisabled] = useState(false);
  const { isLoading, data } = useGetCategory({ code });

  const [category, setCategory] = useState<Category>({
    name: '',
    isActive: false,
    code: '',
    id: '',
    updatedAt: '',
    deletedAt: null,
    createdAt: '',
  });

  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setCategory({ ...(category as Category), name: value });
  }

  function handleToggle(
    event: React.ChangeEvent<HTMLInputElement>,
    isActive: boolean
  ): void {
    setCategory({ ...category, isActive });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDisabled(true);
    await editCategory(category);
    setDisabled(false);
    enqueueSnackbar('Category updated', { variant: 'success' });
    await Router.push('/categories');
  }

  return (
    <CategoryForm
      title="Edit category"
      handleToggle={handleToggle}
      handleChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
      category={category}
    />
  );
}
