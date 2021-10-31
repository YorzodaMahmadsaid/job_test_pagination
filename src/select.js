import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth style={{marginBottom: '20px'}}>
        <InputLabel id="demo-simple-select-label">Select AlbomId</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select AlbomId"
          onChange={handleChange}
        >
          <MenuItem value={10}>AlbomId1</MenuItem>
          <MenuItem value={20}>AlbomId2</MenuItem>
          <MenuItem value={30}>AlbomId3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
