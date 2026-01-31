import React from 'react';
import { TextField, InputAdornment, TextFieldProps, alpha, useTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchInputProps extends Omit<TextFieldProps, 'variant'> {
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <TextField
      placeholder={placeholder}
      onChange={handleChange}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: alpha(theme.palette.grey[500], 0.04),
          borderRadius: 2,
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: theme.palette.grey[300],
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 1,
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default SearchInput;
