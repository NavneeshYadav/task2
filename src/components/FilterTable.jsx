import React, { useState } from "react";
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
} from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
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
].map((row) => ({ ...row, role: "Vice President" })); // set default role

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

export default function ProjectTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("role");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState(initialRows);

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
            {rows
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
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFoot />
    </Paper>
  );
}
