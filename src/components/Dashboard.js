import { React, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import CategorySelector from "./CategorySelector";
import StockItemModal from "./StockItemModal";
import Drawer from "./Drawer";
import axios from "axios";
import BASE_URL from "./baseURL";
import styles from "./Dashboard.module.css";

const extraCategories = {
  brand: "brand",
  description: "description",
  location: "location",
  supplier: "supplier",
};

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
        const response = await axios.get(`${BASE_URL}/api/stock-list`);
        setStockItems(response.data);
      } catch (error) {
        // Handle error if the request fails
        console.error("Error fetching stock items:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchStockItems();
  }, []);

  const mapFilteredItems = (filteredItems) => {
    return filteredItems.map((stockItem) => (
      <StockItemModal
        stockItems={stockItems}
        setStockItems={setStockItems}
        key={stockItem.location}
        stockItemData={stockItem}
      />
    ));
  };

  const filterStockItemsByProperty = (propName) => {
    const lowercasedPropName = propName.toLowerCase();
    return stockItems.filter((stockItem) => {
      return (
        searchKeyword.trim() === "" ||
        stockItem[lowercasedPropName]
          .toString()
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
      );
    });
  };

  const filterStockItemsByCategory = () => {
    return stockItems.filter(
      (stockItem) =>
        (itemCategory.toLocaleLowerCase() === "all categories" ||
          stockItem.category.toLowerCase() === itemCategory.toLowerCase()) &&
        (searchKeyword.trim() === "" ||
          stockItem.title.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  };

  return (
    <div className={styles.container}>
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
              stockItems={stockItems}
              setStockItems={setStockItems}
            />
          </Typography>

          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {authenticatedUser}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Search Bar  */}
      <div className={styles.searchBarContainer}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="#000"
          gutterBottom
        >
          Find Items
        </Typography>

        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CategorySelector
            itemCategory={itemCategory}
            setItemCategory={setItemCategory}
          />
          <TextField
            label="Item keyword"
            variant="outlined"
            value={searchKeyword}
            onChange={handleInputChange}
          />
        </Container>
      </div>
      {/* End search bar */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12}>
            {["Brand", "Supplier", "Description", "Location"].includes(
              itemCategory
            )
              ? mapFilteredItems(filterStockItemsByProperty(itemCategory))
              : mapFilteredItems(filterStockItemsByCategory(itemCategory))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
