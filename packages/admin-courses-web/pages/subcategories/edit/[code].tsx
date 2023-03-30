import React, { useEffect, useState } from 'react';
import useSwr from 'swr';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import {
  emptySubcategory,
  Subcategory,
  SubcategoryForm,
} from '../../../features/subcategories';
import { ApiCaller } from '../../../providers/axios';

const EDIT_URL = (code: string): string => `subcategories/edit/${code}`;
const GET_URL = (code: string): string => `subcategories/${code}`;

export function EditCategory() {
  const router = useRouter();
  const { code } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setDisabled] = useState(false);
  const { isLoading, data } = useSwr(
    GET_URL(code as string),
    ApiCaller.fetch<Subcategory>
  );

  const [subcategory, setSubcategory] = useState<Subcategory>(emptySubcategory);

  useEffect(() => {
    if (!isLoading && data) {
      setSubcategory(data);
    }
  }, [isLoading, data]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setSubcategory({ ...subcategory, [name]: value });
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
    await ApiCaller.post(EDIT_URL(subcategory.code), subcategory);
    setDisabled(false);
    enqueueSnackbar('Subcategory updated', { variant: 'success' });
  }

  return (
    <SubcategoryForm
      title="Edit subcategory"
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

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default EditCategory;
