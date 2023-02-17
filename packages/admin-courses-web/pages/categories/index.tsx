import { Box, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../features/redux/categories/category-slice';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoriesProps {}

export function Categories(props: CategoriesProps) {
  const categories = useSelector(selectCategories);

  const rows: GridRowsProp = categories;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'isActive', headerName: 'ativo', width: 150 },
  ];

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          style={{ marginBottom: '1rem' }}
        >
          Nova Categoria
        </Button>
      </Box>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Box>
  );
}

export default Categories;
