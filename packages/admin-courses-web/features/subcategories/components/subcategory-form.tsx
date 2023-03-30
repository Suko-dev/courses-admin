import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Subcategory } from '../types';
import React from 'react';
import Link from 'next/link';

export interface SubcategoryFormProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleToggle: (
    e: React.ChangeEvent<HTMLInputElement>,
    isToggled: boolean
  ) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  subcategory?: Subcategory;
}

export function SubcategoryForm({
  subcategory,
  title,
  handleToggle,
  handleNameChange,
  handleCategoryChange,
  isLoading = false,
  isDisabled = false,
  onSubmit,
}: SubcategoryFormProps) {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">{title}</Typography>
          </Box>
        </Box>
        <Box p={2}>
          {!isLoading && (
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="name"
                      label="name"
                      disabled={isDisabled || isLoading}
                      onChange={handleNameChange}
                      value={subcategory?.name ?? ''}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="category"
                      label="category"
                      disabled={isDisabled || isLoading}
                      onChange={handleCategoryChange}
                      value={subcategory?.category ?? ''}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          name="isActive"
                          color="secondary"
                          checked={subcategory?.isActive}
                          onChange={handleToggle}
                          inputProps={{ 'aria-label': 'controlled' }}
                          disabled={isDisabled || isLoading}
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      component={Link}
                      href="/subcategories"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isDisabled || isLoading}
                      color="secondary"
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
