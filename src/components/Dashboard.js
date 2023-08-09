import { React, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import CategorySelector from "./CategorySelector";
import StockItemModal from "./StockItemModal";
import Drawer from "./Drawer";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({ setIsLoggedIn, authenticatedUser }) {
  const [stockItems, setStockItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [itemCategory, setItemCategory] = useState("all categories");

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    // Function to fetch stock items from the server
    const fetchStockItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/stock-list"
        );
        setStockItems(response.data);
      } catch (error) {
        // Handle error if the request fails
        console.error("Error fetching stock items:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchStockItems();
  }, []);

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
            <Drawer
              setIsLoggedIn={setIsLoggedIn}
              authenticatedUser={authenticatedUser}
            />
          </Typography>

          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {authenticatedUser}
          </Typography>
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
            itemCategory={itemCategory}
            setItemCategory={setItemCategory}
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
                (itemCategory.toLocaleLowerCase() === "all categories" ||
                  stockItem.category.toLowerCase() === itemCategory.toLowerCase()) &&
                (searchKeyword.trim() === "" || 
                  stockItem.title.toLowerCase().includes(searchKeyword.toLowerCase()))
              ) {
                filteredItems.push(
                  <StockItemModal key={stockItem.location} stockItemData={stockItem} />
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
