import { GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function renderTextCell(row: GridRenderCellParams): JSX.Element {
  return <Typography color="primary">{row.value}</Typography>;
}

function renderLinkCell(
  linkBuilder: (attribute?: string) => string,
  attribute?: string
) {
  return function linkRow(row: GridRenderCellParams): JSX.Element {
    const link = attribute ? linkBuilder(row.row[attribute]) : linkBuilder();

    return (
      <Link style={{ textDecoration: 'none' }} href={link}>
        <Typography color="primary">{row.value}</Typography>
      </Link>
    );
  };
}
function renderActiveCell(row: GridRenderCellParams): JSX.Element {
  return (
    <Typography color={row.value ? 'primary' : 'secondary'}>
      {row.value ? 'Active' : 'Inactive'}
    </Typography>
  );
}

function renderDateCell(row: GridRenderCellParams): JSX.Element {
  return (
    <Typography color={'primary'}>
      {new Date(row.value).toLocaleDateString()}
    </Typography>
  );
}

function renderDeleteCell(handleOnCLick: (value) => void) {
  return function deleteRow(row: GridRenderCellParams): JSX.Element {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleOnCLick(row.row)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  };
}

export const renderTableCells = {
  renderTextCell,
  renderActiveCell,
  renderDateCell,
  renderDeleteCell,
  renderLinkCell,
};

export const callBackRenderCells = ['renderDeleteCell'];
