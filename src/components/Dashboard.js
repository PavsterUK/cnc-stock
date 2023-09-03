import { React, useState, useEffect, useMemo, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import StockItemModal from "./StockItem/StockItemModal";
import Drawer from "./Drawer";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import { ISO_CODES } from "../constants/stockItemConstants";
import { STOCK_ITEM_PROPS } from "../constants/stockItemConstants";
import styles from "./Dashboard.module.css";
import MaterialsSelector from "./MaterialsSelector";
import CatSubCatSelector from "./Categories/CatSubCatSelector";

export default function Dashboard({ setIsLoggedIn, authenticatedUser }) {
  const [stockItems, setStockItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ categoryName: "All Categories", id: 1 });
  const [selectedSubCat, setSelectedSubCat] = useState({ subCategoryName: "All Sub Categories", categoryId: 0 });
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

  const filterItems = useCallback(() => {
    const filterByProperty = (propName) => {
      const lowercasedPropName = propName.toLowerCase();
      return stockItems.filter((stockItem) => {
        switch (lowercasedPropName) {
          case "location":
            return stockItem[lowercasedPropName].toString().toLowerCase() === searchKeyword.toLowerCase();
          case "constock":
            return (
              stockItem.constantStock === true && stockItem.supplier.toLowerCase().includes(searchKeyword.toLowerCase())
            );
          default:
            return stockItem[lowercasedPropName].toString().toLowerCase().includes(searchKeyword.toLowerCase());
        }
      });
    };

    const filterByMaterial = (itemsArray, selectedMaterials) => {
      return itemsArray
        .filter((item) => selectedMaterials.some((selMat) => item.materials.includes(selMat)))
        .sort((a, b) => a.location - b.location);
    };

    const filterByCategory = (selectedCategory) => {
      const selectedCategoryLowCase = selectedCategory.categoryName.toLowerCase();
      return stockItems.filter((stockItem) => {
        if (selectedCategoryLowCase !== "all categories") {
          return (
            stockItem.categoryName.toLowerCase() === selectedCategoryLowCase &&
            stockItem.title.toLowerCase().includes(searchKeyword.toLowerCase())
          );
        } else {
          return stockItem.title.toLowerCase().includes(searchKeyword.toLowerCase());
        }
      });
    };

    const filteredByCategoryOrProperty = STOCK_ITEM_PROPS.includes(selectedCategory.categoryName.toLowerCase())
      ? filterByProperty(selectedCategory.categoryName)
      : filterByCategory(selectedCategory);

    return filterByMaterial(filteredByCategoryOrProperty, selectedMaterials);
  }, [selectedCategory, selectedMaterials, searchKeyword, stockItems]);

  const mapFilteredItems = useMemo(() => {
    return filterItems().map((stockItem) => (
      <StockItemModal
        stockItems={stockItems}
        setStockItems={setStockItems}
        key={stockItem.id}
        stockItemData={stockItem}
      />
    ));
  }, [stockItems, filterItems]);

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
          <Typography component="h1" variant="h4" align="center" color="#000" gutterBottom>
            Find Items
          </Typography>

          <Grid container spacing={0.5}>
            <Grid item sm={4} md={4} lg={4}>
              <CatSubCatSelector
                isSaveorUpdateMode={false}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCat={selectedSubCat}
                setSelectedSubCat={setSelectedSubCat}
              />
            </Grid>
            <Grid item sm={5} md={5} lg={5}>
              <TextField
                fullWidth
                label="Item keyword"
                variant="outlined"
                value={searchKeyword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <MaterialsSelector selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials} />
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {mapFilteredItems}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
