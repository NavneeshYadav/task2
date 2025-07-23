import "./App.css";
import SearchInput from "./components/SearchInput";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import FilterableTable from "./components/FilterTable";
import { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");

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
        <TuneIcon />
      </Box>

      <Box sx={{ padding: 2 }}>
        <FilterableTable searchValue={searchValue} />
      </Box>
    </Box>
  );
}

export default App;
