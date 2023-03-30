import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Category } from '../types';
import { ApiCaller } from '../../../providers/axios';
import { MyTable } from '../../../components';
import { renderTableCells } from '../../../components/table/renders';
import { useListCategories } from '../api-calls';
import { DELETE_CATEGORY_URL } from '../api-calls/constants';

export function ListCategories() {
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, mutate, isValidating } = useListCategories({
    page,
    perPage,
  });

  const [rowCount, setRowCount] = useState(1);

  useEffect(() => {
    setRowCount((rowCount) => data?.meta.total ?? rowCount);
  }, [data?.meta.total]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: renderTableCells['renderLinkCell'](
        (code) => `categories/edit/${code}`,
        'code'
      ),
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
      renderCell: renderTableCells['renderDeleteCell'](deleteCategoryById),
      align: 'center',
      headerAlign: 'center',
    },
  ];

  async function deleteCategoryById({ id, name }: Category): Promise<void> {
    await ApiCaller.post(DELETE_CATEGORY_URL(id));
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
          href="categories/create"
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>
      <MyTable
        columnsDefinitions={columns}
        rows={data?.data ?? []}
        page={page}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        pageSize={perPage}
        rowCount={rowCount}
        isValidating={isValidating}
        isLoading={isLoading}
      />
    </Box>
  );
}
