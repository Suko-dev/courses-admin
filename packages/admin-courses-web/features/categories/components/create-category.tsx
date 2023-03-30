import { CategoryForm } from './category-form';
import React, { useState } from 'react';
import { Category } from '../types';
import { useSnackbar } from 'notistack';
import { createCategory } from '../api-calls';
import Router from 'next/router';

export function CreateCategory() {
  const [category, setCategory] = useState<Category>({
    id: '',
    name: '',
    createdAt: '',
    isActive: false,
    updatedAt: '',
    code: '',
    deletedAt: null,
  });
  const [isDisabled, setDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value.trim() });
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
    await createCategory(category);
    setDisabled(false);
    enqueueSnackbar('Category created', { variant: 'success' });
    await Router.push('/categories');
  }

  return (
    <CategoryForm
      title="Create category"
      handleToggle={handleToggle}
      handleChange={handleChange}
      onSubmit={handleSubmit}
      category={category}
      isDisabled={isDisabled}
    />
  );
}
