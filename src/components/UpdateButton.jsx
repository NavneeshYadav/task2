import React, { useState, useEffect } from "react";
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
  Slide,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Role options (same as in your filter table)
const roleOptions = [
  "Vice President",
  "Senior Project Manager", 
  "Project Manager",
  "Assistant Project Manager"
];

const leadOptions = ["Y", "N"];

// ✅ Slide transition component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function UpdateButton({ onUpdateRole, selectedCount = 0, selectedRoles = [] }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    role: "",
    name: "",
    percentage: "",
    lead: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    percentage: "",
  });

  // Get the first selected role for editing
  const selectedRole = selectedRoles.length > 0 ? selectedRoles[0] : null;

  const handleClickOpen = () => {
    if (selectedCount === 0) {
      setOpen(true);
      return;
    }
    
    if (selectedCount > 1) {
      setOpen(true);
      return;
    }

    // Pre-fill form with selected role data
    if (selectedRole) {
      setFormData({
        id: selectedRole.id,
        role: selectedRole.role,
        name: selectedRole.name,
        percentage: selectedRole.percentage.toString(),
        lead: selectedRole.lead,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form data and errors when closing
    setFormData({
      id: null,
      role: "",
      name: "",
      percentage: "",
      lead: "",
    });
    setErrors({
      name: "",
      percentage: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Call the callback function to update the role
    if (onUpdateRole && formData.id) {
      const updatedData = {
        id: formData.id,
        role: formData.role,
        name: formData.name,
        percentage: Number(formData.percentage),
        lead: formData.lead,
      };
      onUpdateRole(updatedData);
    }
    
    handleClose();
  };

  const getModalContent = () => {
    if (selectedCount === 0) {
      return {
        title: "No Selection",
        content: (
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <Typography variant="body1">
              Please select a role from the table to update.
            </Typography>
          </Alert>
        ),
        actions: (
          <Button onClick={handleClose} variant="outlined">
            OK
          </Button>
        )
      };
    }

    if (selectedCount > 1) {
      return {
        title: "Multiple Selection",
        content: (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="body1" gutterBottom>
              You have selected {selectedCount} roles. Please select only one role to update.
            </Typography>
            <Typography variant="body2">
              You can only update one role at a time.
            </Typography>
          </Alert>
        ),
        actions: (
          <Button onClick={handleClose} variant="outlined">
            OK
          </Button>
        )
      };
    }

    // Single selection - show form
    return {
      title: `Update Role - ${selectedRole?.name}`,
      content: (
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

          {/* Reporting Lead Select */}
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
      ),
      actions: (
        <>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Role
          </Button>
        </>
      )
    };
  };

  const modalContent = getModalContent();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
        disabled={selectedCount === 0}
      >
        Update {selectedCount === 1 ? "Role" : "Roles"}
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: { 
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div">
            {modalContent.title}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {modalContent.content}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          {modalContent.actions}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateButton;
