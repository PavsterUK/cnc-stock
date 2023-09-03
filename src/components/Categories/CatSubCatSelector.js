import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";
import axios from "axios";
import styles from "./CatSubCatSelector.module.css";
import { BASE_URL } from "../../constants/config";
import { STOCK_ITEM_PROPS } from "../../constants/stockItemConstants";

const CatSubCatSelector = ({
  isSaveorUpdateMode,
  selectedCategory,
  setSelectedCategory,
  selectedSubCat,
  setSelectedSubCat,
}) => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingSubCat, setIsLoadingSubCat] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedSubCat, setFetchedSubCat] = useState([]);
  const allSubCategoriesOption = { id: 0, subCategoryName: "All Sub Categories" };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        setFetchedCategories(response.data);
        setIsLoadingCategories(false);

        if (selectedCategory && selectedCategory.id) {
          fetchSubCategories(selectedCategory.id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      fetchSubCategories(selectedCategory.id);
    }
  }, [selectedCategory]);

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/subcategories/${categoryId}`);
      setFetchedSubCat([allSubCategoriesOption, ...response.data]);
      setIsLoadingSubCat(false);
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    }
  };

  const mapCategoryMenuItems = () => {
    let categoriesToMap = fetchedCategories;
    //Remove item props (brand, location etc)
    if (isSaveorUpdateMode) {
      categoriesToMap = categoriesToMap.filter(
        (category) => !STOCK_ITEM_PROPS.includes(category.categoryName.toLowerCase())
      );
    }
    return categoriesToMap.map((category) => (
      <MenuItem key={category.id} value={category.categoryName}>
        {category.categoryName}
      </MenuItem>
    ));
  };

  const mapSubCatMenuItems = () => {
    return fetchedSubCat.map((subcategory) => (
      <MenuItem key={subcategory.id} value={subcategory.subCategoryName}>
        {subcategory.subCategoryName}
      </MenuItem>
    ));
  };

  const handleCategorySelect = (event) => {
    const selectedCategoryName = event.target.value;
    const id = fetchedCategories.find((category) => category.categoryName === selectedCategoryName)?.id;
    fetchSubCategories(id);
    setSelectedSubCat({ subCategoryName: "All Sub Categories", categoryId: 1 });
    setSelectedCategory({ id: id, categoryName: selectedCategoryName });
  };

  const handleSubCatSelect = (event) => {
    const selectedSubCatName = event.target.value;
    const categoryId = selectedCategory.id;
    setSelectedSubCat({ categoryId: categoryId, subCategoryName: selectedSubCatName });
  };

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        {isLoadingCategories ? (
          <CircularProgress />
        ) : (
          <Select value={selectedCategory.categoryName} onChange={handleCategorySelect}>
            {mapCategoryMenuItems()}
          </Select>
        )}
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Sub Category</InputLabel>
        {isLoadingSubCat ? (
          <CircularProgress />
        ) : (
          fetchedSubCat.length > 0 && (
            <Select value={selectedSubCat.subCategoryName} onChange={handleSubCatSelect}>
              {mapSubCatMenuItems()}
            </Select>
          )
        )}
      </FormControl>
    </div>
  );
};

export default CatSubCatSelector;
