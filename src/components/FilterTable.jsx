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
  Toolbar,
  Typography,
} from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
// Sample data
const rows = [
  { id: 1, role: "Developer", name: "Alice", percentage: 60, lead: "Bob" },
  { id: 2, role: "Designer", name: "Eve", percentage: 40, lead: "Bob" },
  { id: 3, role: "QA", name: "Charlie", percentage: 100, lead: "Dave" },
  { id: 4, role: "Developer", name: "Alice", percentage: 60, lead: "Bob" },
  { id: 5, role: "Designer", name: "Eve", percentage: 40, lead: "Bob" },
  { id: 6, role: "QA", name: "Charlie", percentage: 100, lead: "Dave" },
  { id: 7, role: "Developer", name: "Alice", percentage: 60, lead: "Bob" },
  { id: 8, role: "Designer", name: "Eve", percentage: 40, lead: "Bob" },
  { id: 9, role: "QA", name: "Charlie", percentage: 100, lead: "Dave" },
  { id: 10, role: "Developer", name: "Alice", percentage: 60, lead: "Bob" },
  { id: 11, role: "Designer", name: "Eve", percentage: 40, lead: "Bob" },
  { id: 12, role: "QA", name: "Charlie", percentage: 100, lead: "Dave" },
];

function descendingComparator(a, b, orderBy) {
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#e1e6ed" }}>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
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
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.percentage}%</TableCell>
                    <TableCell>{row.lead}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
