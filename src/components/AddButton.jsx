import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
} from "@mui/material";

// Role options (same as in your filter table)
const roleOptions = [
  "Vice President",
  "Senior Project Manager", 
  "Project Manager",
  "Assistant Project Manager"
];

const leadOptions = ["Y", "N"];

function AddButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: "Vice President", // default value
    name: "",
    percentage: "",
    lead: "Y", // default value
  });
  const [errors, setErrors] = useState({
    name: "",
    percentage: "",
    // ✅ Removed lead from errors state
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form data and errors when closing
    setFormData({
      role: "Vice President",
      name: "",
      percentage: "",
      lead: "Y",
    });
    setErrors({
      name: "",
      percentage: "",
      // ✅ Removed lead from errors reset
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.percentage) {
      newErrors.percentage = "Percentage is required";
    } else if (formData.percentage < 0 || formData.percentage > 100) {
      newErrors.percentage = "Percentage must be between 0 and 100";
    }
    
    // ✅ Removed lead validation since it always has a valid default value

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Process the form data (e.g., add to table, send to API)
    console.log("New role data:", formData);
    
    // You can pass this data back to parent component or handle it here
    // For example: onAddRole(formData) if passed as prop
    
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Add Roles
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div">
            Add New Role
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 2 }}>
            {/* Project Role Select */}
            <FormControl fullWidth>
              <InputLabel>Project Role *</InputLabel>
              <Select
                value={formData.role}
                label="Project Role *"
                onChange={(e) => handleInputChange("role", e.target.value)}
              >
                {roleOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Name Input */}
            <Box>
              <TextField
                label="Name"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter name"
                error={!!errors.name}
              />
              {errors.name && (
                <Typography 
                  variant="caption" 
                  color="error" 
                  sx={{ 
                    display: "block", 
                    mt: 0.5, 
                    ml: 1.5,
                    fontSize: "0.75rem"
                  }}
                >
                  {errors.name}
                </Typography>
              )}
            </Box>

            {/* Percentage Input */}
            <Box>
              <TextField
                label="Percentage"
                required
                fullWidth
                type="number"
                value={formData.percentage}
                onChange={(e) => handleInputChange("percentage", e.target.value)}
                placeholder="Enter percentage (0-100)"
                inputProps={{ min: 0, max: 100 }}
                error={!!errors.percentage}
              />
              {errors.percentage && (
                <Typography 
                  variant="caption" 
                  color="error" 
                  sx={{ 
                    display: "block", 
                    mt: 0.5, 
                    ml: 1.5,
                    fontSize: "0.75rem"
                  }}
                >
                  {errors.percentage}
                </Typography>
              )}
            </Box>

            {/* Reporting Lead Select - ✅ Simplified without error handling */}
            <FormControl fullWidth>
              <InputLabel>Reporting Lead *</InputLabel>
              <Select
                value={formData.lead}
                label="Reporting Lead *"
                onChange={(e) => handleInputChange("lead", e.target.value)}
              >
                {leadOptions.map((lead) => (
                  <MenuItem key={lead} value={lead}>
                    {lead}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Add Role
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddButton;
