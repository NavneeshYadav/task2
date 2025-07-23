import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
function TableFoot() {
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{ border: "2px solid #1976d2", backgroundColor: "white" }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ border: "2px solid #1976d2", backgroundColor: "white" }}
        >
          Save
        </Button>
        <Button variant="contained" color="primary">
          Next <ArrowForwardIcon sx={{ ml: 1 }} />
        </Button>
      </Box>
    </Box>
  );
}

export default TableFoot;
