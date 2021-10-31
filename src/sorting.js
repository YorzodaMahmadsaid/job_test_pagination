import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from './select';

export default function IconLabelButtons() {
  return (
    <Stack direction="row" spacing={1}>
      <Select />
      <Button variant="outlined" style={{marginBottom: '20px'}}>
        Sorting
      </Button>
    </Stack>
  );
}
