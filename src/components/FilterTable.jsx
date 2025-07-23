import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import TableFoot from "./TableFoot";

// Custom project role rank for sorting → lower number = higher rank
const rolePriority = {
  "Vice President": 1,
  "Senior Project Manager": 2,
  "Project Manager": 3,
  "Assistant Project Manager": 4,
};

// Default options for select dropdown
const roleOptions = Object.keys(rolePriority);

// Sample data
const initialRows = [
  { id: 1, name: "Alice", percentage: 60, lead: "Y" },
  { id: 2, name: "Eve", percentage: 40, lead: "N" },
  { id: 3, name: "Charlie", percentage: 100, lead: "N" },
  { id: 4, name: "David", percentage: 70, lead: "Y" },
  { id: 5, name: "Olivia", percentage: 85, lead: "Y" },
  { id: 6, name: "Emma", percentage: 90, lead: "N" },
].map((row) => ({ ...row, role: "Vice President" }));

// Custom comparator for project role
function customRoleComparator(a, b) {
  return rolePriority[a.role] - rolePriority[b.role];
}

// General comparators
function descendingComparator(a, b, orderBy) {
  if (orderBy === "role") return customRoleComparator(b, a);
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function ProjectTable({ searchValue, filters }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("role");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState(initialRows);

  // Filter rows based on search value and filters
  const filteredRows = useMemo(() => {
    let filtered = rows;

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter((row) =>
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.role.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.lead.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.percentage.toString().includes(searchValue)
      );
    }

    // Apply advanced filters
    if (filters.role) {
      filtered = filtered.filter((row) => row.role === filters.role);
    }

    if (filters.lead) {
      filtered = filtered.filter((row) => row.lead === filters.lead);
    }

    if (filters.name) {
      filtered = filtered.filter((row) =>
        row.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.percentageMin) {
      filtered = filtered.filter((row) => row.percentage >= Number(filters.percentageMin));
    }

    if (filters.percentageMax) {
      filtered = filtered.filter((row) => row.percentage <= Number(filters.percentageMax));
    }

    return filtered;
  }, [rows, searchValue, filters]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = [...selected, id];
    else newSelected = selected.filter((s) => s !== id);
    setSelected(newSelected);
  };

  const handleRoleChange = (id, newRole) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, role: newRole } : row))
    );
  };

  const isSelected = (id) => selected.includes(id);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#e1e6ed" }}>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>
                <TableSortLabel
                  active={orderBy === "role"}
                  direction={orderBy === "role" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "role")}
                  IconComponent={ChangeHistoryIcon}
                >
                  Project Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "name")}
                  IconComponent={ChangeHistoryIcon}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "percentage"}
                  direction={orderBy === "percentage" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "percentage")}
                  IconComponent={ChangeHistoryIcon}
                >
                  Percentage
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lead"}
                  direction={orderBy === "lead" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "lead")}
                  IconComponent={ChangeHistoryIcon}
                >
                  Reporting Lead
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.length === 0 ? (
              // Not Found Message
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <SearchOffIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography variant="h6" color="text.secondary">
                      No results found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchValue || Object.values(filters).some(f => f !== "")
                        ? "No records match your search criteria"
                        : "No data available"
                      }
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              // Regular table rows
              filteredRows
                .slice()
                .sort(getComparator(order, orderBy))
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow hover key={row.id} selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleCheckboxClick(event, row.id)}
                        />
                      </TableCell>

                      <TableCell sx={{ width: 400 }}>
                        <Select
                          value={row.role}
                          onChange={(e) =>
                            handleRoleChange(row.id, e.target.value)
                          }
                          size="small"
                          fullWidth
                        >
                          {roleOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.percentage}%</TableCell>
                      <TableCell>{row.lead}</TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFoot />
    </Paper>
  );
}
