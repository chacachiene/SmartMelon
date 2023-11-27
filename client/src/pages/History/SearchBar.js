
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Grid } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('option-3'); // Default filter

  const handleSearch = () => {
    // Call the parent component's onSearch function with the search term and selected filter
    onSearch(searchTerm, selectedFilter);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <form>
          <TextField
            id="search-orders"
            name="searchorders"
            label="Search"
            variant="outlined"
            fullWidth={true}
            size="small"
            style={{ maxWidth: '200px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </Grid>
      <Grid item>
        <Button variant="contained" size="small" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
      <Grid item>
        <Select
          variant="outlined"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="option-1">All</MenuItem>
          <MenuItem value="option-2">Today</MenuItem>
          <MenuItem value="option-3">7 days</MenuItem>
          <MenuItem value="option-4">30 days</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
