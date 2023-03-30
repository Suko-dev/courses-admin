import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { createSubcategory } from '../api-calls';
import Router from 'next/router';
import { Subcategory } from '../types';
import { SubcategoryForm } from './subcategory-form';

export function CreateSubcategory() {
  const [subcategory, setSubcategory] = useState<Subcategory>({
    id: '',
    name: '',
    category: '',
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
    setSubcategory({ ...subcategory, [name]: value.trim() });
  }

  function handleToggle(
    event: React.ChangeEvent<HTMLInputElement>,
    isActive: boolean
  ): void {
    setSubcategory({ ...subcategory, isActive });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDisabled(true);
    await createSubcategory(subcategory);
    setDisabled(false);
    enqueueSnackbar('Subcategory created', { variant: 'success' });
    await Router.push('/categories');
  }

  return (
    <SubcategoryForm
      title="Create subcategory"
      handleToggle={handleToggle}
      handleNameChange={handleChange}
      onSubmit={handleSubmit}
      subcategory={subcategory}
      isDisabled={isDisabled}
      handleCategoryChange={handleChange}
    />
  );
}
