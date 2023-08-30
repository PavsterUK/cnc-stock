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
import MaterialsSelector from "./MaterialsSelector";
import SubCategorySelector from "./SubCategorySelector";

const ISO_CODES = ["P", "M", "K", "N", "S", "H"];

export default function Dashboard({ setIsLoggedIn, authenticatedUser }) {
  const [stockItems, setStockItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userSelectedCategory, setUserSelectedCategory] = useState({
    categoryName: "All Categories",
    categoryId: 1
  });
  const [userSelectedSubCategory, setUserSelectedSubCategory] = useState("All Sub");
  const [selectedMaterials, setSelectedMaterials] = useState(ISO_CODES);

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/stock-list`);
        setStockItems(response.data);
      } catch (error) {
        console.error("Error fetching stock items:", error);
      }
    };

    fetchStockItems();
  }, []);

  const mapFilteredItems = (filteredItems) => {
    return filteredItems.map((stockItem) => (
      <StockItemModal
        stockItems={stockItems}
        setStockItems={setStockItems}
        key={stockItem.id}
        stockItemData={stockItem}
      />
    ));
  };

  const filterStockItemsByProperty = (propName) => {
    const lowercasedPropName = propName.toLowerCase();

    return stockItems.filter((stockItem) => {
      switch (lowercasedPropName) {
        case "location":
          return (
            stockItem[lowercasedPropName].toString().toLowerCase() ===
            searchKeyword.toLowerCase()
          );
        case "constock":
          return (
            stockItem.constantStock === true &&
            stockItem.supplier
              .toLowerCase()
              .includes(searchKeyword.toLowerCase())
          );
        default:
          return stockItem[lowercasedPropName]
            .toString()
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
      }
    });
  };

  const filterByMaterial = (itemsArray, selectedMaterials) => {
    return itemsArray
      .filter((item) =>
        selectedMaterials.some((selMat) => item.materials.includes(selMat))
      )
      .sort((a, b) => a.location - b.location);
  };

  const filterStockItemsByCategory = (userSelectedCategory) => {
    const userSelectedCategoryLowCase = userSelectedCategory.categoryName.toLowerCase();
  
    return stockItems.filter((stockItem) => {
      if (userSelectedCategoryLowCase !== "all categories") {
        return (
          stockItem.categoryName.toLowerCase() === userSelectedCategoryLowCase &&
          stockItem.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      } else {
        return stockItem.title.toLowerCase().includes(searchKeyword.toLowerCase());
      }
    });
  };

  const filteredByCategoryOrProperty = [
    "brand",
    "supplier",
    "description",
    "location",
    "constock",
  ].includes(userSelectedCategory.categoryName.toLowerCase())
    ? filterStockItemsByProperty(userSelectedCategory.categoryName)
    : filterStockItemsByCategory(userSelectedCategory);

  const filteredBySelectedMaterials = filterByMaterial(
    filteredByCategoryOrProperty,
    selectedMaterials
  );

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

      {/* End search bar */}
      <Container component="main">
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

          <Grid container spacing={0.5}>
            <Grid item sm={1.5} md={1.5} lg={1.5}>
              <CategorySelector
                userSelectedCategory={userSelectedCategory}
                setUserSelectedCategory={setUserSelectedCategory}
              />
            </Grid>
            <Grid item sm={1.5} md={1.5} lg={1.5}>
              <SubCategorySelector
                
                userSelectedSubCategory={userSelectedSubCategory}
                setUserSelectedSubCategory={setUserSelectedSubCategory}
              />
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <TextField
                fullWidth
                label="Item keyword"
                variant="outlined"
                value={searchKeyword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <MaterialsSelector
                selectedMaterials={selectedMaterials}
                setSelectedMaterials={setSelectedMaterials}
              />
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {mapFilteredItems(filteredBySelectedMaterials)}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
