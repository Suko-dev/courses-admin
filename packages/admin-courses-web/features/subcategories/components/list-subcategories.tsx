import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Subcategory } from '../types';
import { MyTable } from '../../../components';
import { renderTableCells } from '../../../components/table/renders';
import { deleteSubcategory } from '../api-calls/delete-subcategory';
import { useListSubcategories } from '../api-calls';

export function ListSubcategories() {
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, mutate, isValidating } = useListSubcategories({
    page,
    perPage,
  });
  const [rowCount, setRowCount] = useState(1);

  useEffect(() => {
    setRowCount(data?.meta.total ?? rowCount);
  }, [data?.meta.total, isValidating, rowCount]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: renderTableCells['renderLinkCell'](
        (code) => `subcategories/edit/${code}`,
        'code'
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: renderTableCells['renderTextCell'],
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 0.5,
      type: 'boolean',
      renderCell: renderTableCells['renderActiveCell'],
    },
    {
      field: 'createdAt',
      headerName: 'Creation date',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: renderTableCells['renderDateCell'],
    },
    {
      field: 'id',
      headerName: 'Delete',
      flex: 0.3,
      renderCell: renderTableCells['renderDeleteCell'](deleteSubcategoryById),
      align: 'center',
      headerAlign: 'center',
    },
  ];

  async function deleteSubcategoryById({
    id,
    name,
  }: Subcategory): Promise<void> {
    await deleteSubcategory(id);
    enqueueSnackbar(`Category '${name}' deleted`, { variant: 'success' });
    mutate(data, { revalidate: true }).catch();
  }

  function handlePageChange(page: number) {
    setPage(page);
  }
  function handlePageSizeChange(pageSize: number) {
    setPerPage(pageSize);
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href="subcategories/create"
          style={{ marginBottom: '1rem' }}
        >
          New Subcategory
        </Button>
      </Box>
      <MyTable
        columnsDefinitions={columns}
        rows={data?.data || []}
        isLoading={isLoading}
        page={page}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        pageSize={perPage}
        rowCount={rowCount}
        isValidating={isValidating}
      />
    </Box>
  );
}
