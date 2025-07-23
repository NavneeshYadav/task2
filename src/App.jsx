import "./App.css";
import SearchInput from "./components/SearchInput";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import FilterableTable from "./components/FilterTable";
import { useState } from "react";
import {
  IconButton,
  Popover,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Divider,
  Chip,
} from "@mui/material";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    role: "",
    lead: "",
    name: "",
    percentageMin: "",
    percentageMax: "",
  });

  // Filter options
  const roleOptions = ["Vice President", "Senior Project Manager", "Project Manager", "Assistant Project Manager"];
  const leadOptions = ["Y", "N"];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      role: "",
      lead: "",
      name: "",
      percentageMin: "",
      percentageMax: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "");
  const open = Boolean(filterAnchorEl);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <SearchInput 
          value={searchValue}
          onChange={setSearchValue}
        />
        
        <Box sx={{ position: "relative" }}>
          <IconButton 
            onClick={handleFilterClick}
            sx={{ 
              color: hasActiveFilters ? "primary.main" : "inherit",
              backgroundColor: hasActiveFilters ? "primary.light" : "transparent",
            }}
          >
            <TuneIcon />
          </IconButton>
          
          {hasActiveFilters && (
            <Box
              sx={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "error.main",
              }}
            />
          )}
        </Box>

        <Popover
          open={open}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Paper sx={{ p: 3, minWidth: 300 }}>
            <Typography variant="h6" gutterBottom>
              Filter Options
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Role Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Project Role</InputLabel>
                <Select
                  value={filters.role}
                  label="Project Role"
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                >
                  <MenuItem value="">All Roles</MenuItem>
                  {roleOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Lead Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Reporting Lead</InputLabel>
                <Select
                  value={filters.lead}
                  label="Reporting Lead"
                  onChange={(e) => handleFilterChange("lead", e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {leadOptions.map((lead) => (
                    <MenuItem key={lead} value={lead}>
                      {lead}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Name Filter */}
              <TextField
                label="Name"
                size="small"
                fullWidth
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                placeholder="Enter name to filter"
              />

              {/* Percentage Range Filter */}
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Percentage Range
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  label="Min %"
                  size="small"
                  type="number"
                  value={filters.percentageMin}
                  onChange={(e) => handleFilterChange("percentageMin", e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Max %"
                  size="small"
                  type="number"
                  value={filters.percentageMax}
                  onChange={(e) => handleFilterChange("percentageMax", e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button variant="outlined" size="small" onClick={handleClearFilters}>
                  Clear All
                </Button>
                <Button variant="contained" size="small" onClick={handleFilterClose}>
                  Apply Filters
                </Button>
              </Box>
            </Box>
          </Paper>
        </Popover>
      </Box>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box sx={{ paddingX: 4, paddingBottom: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Active Filters:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.role && (
              <Chip
                label={`Role: ${filters.role}`}
                size="small"
                onDelete={() => handleFilterChange("role", "")}
              />
            )}
            {filters.lead && (
              <Chip
                label={`Lead: ${filters.lead}`}
                size="small"
                onDelete={() => handleFilterChange("lead", "")}
              />
            )}
            {filters.name && (
              <Chip
                label={`Name: ${filters.name}`}
                size="small"
                onDelete={() => handleFilterChange("name", "")}
              />
            )}
            {(filters.percentageMin || filters.percentageMax) && (
              <Chip
                label={`Percentage: ${filters.percentageMin || 0}-${filters.percentageMax || 100}%`}
                size="small"
                onDelete={() => {
                  handleFilterChange("percentageMin", "");
                  handleFilterChange("percentageMax", "");
                }}
              />
            )}
          </Box>
        </Box>
      )}

      <Box sx={{ padding: 2 }}>
        <FilterableTable searchValue={searchValue} filters={filters} />
      </Box>
    </Box>
  );
}

export default App;
