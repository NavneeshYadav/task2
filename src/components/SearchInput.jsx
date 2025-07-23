import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchInput({ value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);
  const handleClear = () => onChange("");

  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      value={value}
      onChange={handleChange}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search"
              onClick={handleClear}
              edge="end"
              size="small"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
