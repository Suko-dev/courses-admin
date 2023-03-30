import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { emptySubcategory, Subcategory } from '../types';
import { editSubcategory, useGetSubcategory } from '../api-calls';
import Router from 'next/router';
import { SubcategoryForm } from './subcategory-form';

type EditCategoryProps = {
  code: string;
};

export function EditSubcategory({ code }: EditCategoryProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setDisabled] = useState(false);
  const { isLoading, data } = useGetSubcategory({ code });

  const [subcategory, setSubcategory] = useState<Subcategory>(emptySubcategory);

  useEffect(() => {
    if (data) {
      setSubcategory(data);
    }
  }, [data]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSubcategory({ ...subcategory, name: value });
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
    await editSubcategory(subcategory);
    setDisabled(false);
    enqueueSnackbar('Subcategory updated', { variant: 'success' });
    await Router.push('/subcategories');
  }

  return (
    <SubcategoryForm
      title="Edit category"
      handleToggle={handleToggle}
      handleNameChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
      subcategory={subcategory}
      handleCategoryChange={handleChange}
    />
  );
}
