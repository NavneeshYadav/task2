import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// ✅ Slide transition for the modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function DeleteButton({ onDelete, selectedCount = 0 }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (selectedCount === 0) {
      // Show a different modal for no selection
      setOpen(true);
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        disabled={selectedCount === 0}
      >
        Delete {selectedCount > 0 ? `(${selectedCount})` : "Roles"}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <WarningAmberIcon 
              sx={{ 
                color: selectedCount === 0 ? "warning.main" : "error.main",
                fontSize: 28 
              }} 
            />
            <Typography variant="h6" component="div">
              {selectedCount === 0 ? "No Selection" : "Confirm Deletion"}
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          {selectedCount === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Please select at least one role to delete from the table.
            </Typography>
          ) : (
            <Box>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the selected {selectedCount} role{selectedCount > 1 ? 's' : ''}?
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            {selectedCount === 0 ? "OK" : "Cancel"}
          </Button>
          {selectedCount > 0 && (
            <Button 
              onClick={handleConfirmDelete} 
              variant="contained" 
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete {selectedCount} Role{selectedCount > 1 ? 's' : ''}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;
