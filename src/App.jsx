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
import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";
import UpdateButton from "./components/UpdateButton"; // ✅ Import UpdateButton

// Initial table data
const initialTableData = [
  { id: 1, name: "Alice", percentage: 60, lead: "Y", role: "Vice President" },
  { id: 2, name: "Eve", percentage: 40, lead: "N", role: "Vice President" },
  {
    id: 3,
    name: "Charlie",
    percentage: 100,
    lead: "N",
    role: "Vice President",
  },
  { id: 4, name: "David", percentage: 70, lead: "Y", role: "Vice President" },
  { id: 5, name: "Olivia", percentage: 85, lead: "Y", role: "Vice President" },
  { id: 6, name: "Emma", percentage: 90, lead: "N", role: "Vice President" },
];

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    role: "",
    lead: "",
    name: "",
    percentageMin: "",
    percentageMax: "",
  });

  // Filter options
  const roleOptions = [
    "Vice President",
    "Senior Project Manager",
    "Project Manager",
    "Assistant Project Manager",
  ];
  const leadOptions = ["Y", "N"];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
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

  // Function to add new role to table
  const handleAddRole = (newRoleData) => {
    const newId = Math.max(...tableData.map((row) => row.id), 0) + 1;
    const newRole = {
      id: newId,
      role: newRoleData.role,
      name: newRoleData.name,
      percentage: Number(newRoleData.percentage),
      lead: newRoleData.lead,
    };

    setTableData((prev) => [...prev, newRole]);
    console.log("New role added:", newRole);
  };

  // Function to update role in table (for dropdown changes)
  const handleUpdateRoleDropdown = (id, newRole) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, role: newRole } : row))
    );
  };

  // ✅ Function to update entire role record
  const handleUpdateRole = (updatedRoleData) => {
    setTableData((prev) =>
      prev.map((row) => 
        row.id === updatedRoleData.id 
          ? { ...row, ...updatedRoleData }
          : row
      )
    );
    
    // Clear selection after update
    setSelectedRows([]);
    console.log("Role updated:", updatedRoleData);
  };

  // Function to delete selected roles
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      return;
    }

    // Filter out selected rows from table data
    setTableData((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
    
    // Clear selected rows after deletion
    setSelectedRows([]);
    
    console.log(`Deleted ${selectedRows.length} role(s)`);
  };

  // Function to handle row selection changes
  const handleSelectionChange = (newSelected) => {
    setSelectedRows(newSelected);
  };

  // ✅ Function to get selected role data
  const getSelectedRoleData = () => {
    return tableData.filter(row => selectedRows.includes(row.id));
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <SearchInput value={searchValue} onChange={setSearchValue} />
          <AddButton onAddRole={handleAddRole} />
          <UpdateButton 
            onUpdateRole={handleUpdateRole}
            selectedCount={selectedRows.length}
            selectedRoles={getSelectedRoleData()}
          />
          <DeleteButton 
            onDelete={handleDeleteSelected} 
            selectedCount={selectedRows.length}
            selectedRoles={getSelectedRoleData()}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={handleFilterClick}
            sx={{
              color: hasActiveFilters ? "primary.main" : "inherit",
              backgroundColor: hasActiveFilters
                ? "primary.light"
                : "transparent",
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
                  onChange={(e) =>
                    handleFilterChange("percentageMin", e.target.value)
                  }
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Max %"
                  size="small"
                  type="number"
                  value={filters.percentageMax}
                  onChange={(e) =>
                    handleFilterChange("percentageMax", e.target.value)
                  }
                  sx={{ flex: 1 }}
                />
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Clear All Button only */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClearFilters}
                  disabled={!hasActiveFilters}
                >
                  Clear All Filters
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
                label={`Percentage: ${filters.percentageMin || 0}-${
                  filters.percentageMax || 100
                }%`}
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
        <FilterableTable
          searchValue={searchValue}
          filters={filters}
          tableData={tableData}
          onUpdateRole={handleUpdateRoleDropdown} // For dropdown updates
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
        />
      </Box>
    </Box>
  );
}

export default App;
