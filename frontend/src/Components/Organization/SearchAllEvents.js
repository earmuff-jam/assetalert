import React, { useEffect, useState } from 'react';

import { Autocomplete } from '@material-ui/lab';
import { TextField, useTheme } from '@material-ui/core';

const SearchAllEvents = ({ events, setSearchValue }) => {
  const theme = useTheme();
  const [options, setOptions] = useState([]);

  const handleInputChange = (field, value) => {
    setSearchValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (events.length > 0) {
      setOptions([...events]);
    } else {
      setOptions([]);
    }
  }, [events]);

  return (
    <Autocomplete
      data-tour="4"
      id="search-events-autocomplete"
      fullWidth
      options={options}
      onChange={(e, value) => {
        const selectedEventId = value?.id || '';
        return handleInputChange('id', selectedEventId);
      }}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find selected event ... "
          variant="standard"
          style={{
            fontSize: '1.6rem',
            fontWeight: 'bolder',
            color: theme.palette.text.secondary,
          }}
        />
      )}
    />
  );
};

export default SearchAllEvents;
