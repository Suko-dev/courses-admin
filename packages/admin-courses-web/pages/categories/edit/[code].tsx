import React from 'react';
import { useRouter } from 'next/router';
import { EditCategory } from '../../../features/categories/components/edit-category';

export default function EditCategoryPage() {
  const router = useRouter();
  const code = router.query.code as string;

  return <EditCategory code={code} />;
}

export function getServerSideProps() {
  return {
    props: {},
  };
}
