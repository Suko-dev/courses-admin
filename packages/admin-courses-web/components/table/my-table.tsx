import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import React from 'react';

export interface TableProps {
  columnsDefinitions: GridColDef[];
  rows;
  page: number;
  handlePageChange: (page: number, details: GridCallbackDetails) => void;
  handlePageSizeChange: (
    pageSize: number,
    details: GridCallbackDetails
  ) => void;

  pageSize: number;
  rowCount: number;
  isValidating: boolean;
  isLoading: boolean;
}

export function MyTable({
  rows,
  columnsDefinitions,
  page,
  handlePageChange,
  pageSize,
  rowCount,
  handlePageSizeChange,
  isValidating,
  isLoading,
}: TableProps) {
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <DataGrid
        rows={isLoading ? [] : rows}
        columns={columnsDefinitions}
        components={{ Toolbar: GridToolbar }}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        loading={isLoading || isValidating}
        paginationMode="server"
        pagination={true}
        page={page}
        rowCount={rowCount}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[10, 25, 50]}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
