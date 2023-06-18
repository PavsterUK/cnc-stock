import { React, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import CategorySelector from "./CategorySelector";
import StockItemModal from "./StockItemModal";

const stockItems = [
  {
    title: "CNMG120408-WPP20S",
    location: "0",
    description: "turning insert",
    category: "turning",
  },
  {
    title: "DNMG150408-WPP20S",
    location: "0",
    description: "turning insert",
    category: "turning",
  },
  {
    title: "12MM Endmill",
    location: "0",
    description: "turning insert",
    category: "milling",
  },
  {
    title: "12MM Endmill",
    location: "0",
    description: "turning insert",
    category: "milling",
  },
  {
    title: "19MM Drill",
    location: "0",
    description: "turning insert",
    category: "hole making",
  },
  {
    title: "19MM Drill",
    location: "0",
    description: "turning insert",
    category: "hole making",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({ setIsLoggedIn }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const userLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            RotaVal CNC Stock
          </Typography>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            RotaVal CNC Stock
          </Typography>
          <Button
            onClick={userLogOut}
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* Search Bar  */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Find Items
        </Typography>

        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ display: "flex" }}
        >
          <CategorySelector
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
          />
          <TextField
            id="outlined-basic"
            label="Item keyword"
            variant="outlined"
            value={searchKeyword}
            onChange={handleInputChange}
          />
        </Container>
      </Container>
      {/* End search bar */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12}>
            {stockItems.reduce((filteredItems, stockItem) => {
              if (
                (searchCategory === "all" ||
                  stockItem.category === searchCategory.toLowerCase()) &&
                (searchKeyword === "" ||
                  stockItem.title
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()))
              ) {
                filteredItems.push(
                  <StockItemModal stockItemData={stockItem} />
                );
              }
              return filteredItems;
            }, [])}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
