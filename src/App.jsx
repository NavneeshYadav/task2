import "./App.css";
import SearchInput from "./components/SearchInput";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import FilterableTable from "./components/FilterTable";
function App() {
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
        <SearchInput />
        <TuneIcon />
      </Box>

      <Box sx={{ padding: 2 }}>
        <FilterableTable />
      </Box>
    </Box>
  );
}

export default App;
