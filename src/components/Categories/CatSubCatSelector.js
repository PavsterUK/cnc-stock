import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./CatSubCatSelector.module.css";
import { STOCK_ITEM_PROPS } from "../../constants/stockItemConstants";
import { CategoriesContext } from "./CategoriesContext";

const CatSubCatSelector = ({
  isSaveorUpdateMode,
  selectedCategory,
  setSelectedCategory,
  selectedSubCat,
  setSelectedSubCat,
}) => {
  const { categories, fetchSubCategoriesByCategoryId, allSubCategoriesOption } = useContext(CategoriesContext);
  const [subCategories, setSubCategories] = useState([]);

  const fetchAndSetSubCategories = async (categoryId) => {
    try {
      const subCategoriesData = await fetchSubCategoriesByCategoryId(categoryId);
      setSubCategories(subCategoriesData);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory.id) {
      fetchAndSetSubCategories(selectedCategory.id);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (event) => {
    const selectedCategoryName = event.target.value;
    const id = categories.find((category) => category.categoryName === selectedCategoryName)?.id;
    fetchAndSetSubCategories(id);
    setSelectedCategory({ id: id, categoryName: selectedCategoryName });
    setSelectedSubCat(allSubCategoriesOption);
  };

  const handleSubCatSelect = (event) => {
    const selectedSubCatName = event.target.value;
    const categoryId = selectedCategory.id;
    const id = subCategories.find((subCategory) => subCategory.subCategoryName === selectedSubCatName)?.id;
    setSelectedSubCat({ id: id, categoryId: categoryId, subCategoryName: selectedSubCatName });
  };

  const mapSubCatMenuItems = () => {
    return subCategories.map((subcategory) => (
      <MenuItem key={subcategory.id} value={subcategory.subCategoryName}>
        {subcategory.subCategoryName}
      </MenuItem>
    ));
  };

  const mapCategoryMenuItems = () => {
    let categoriesToMap = categories;
    // Remove item props (brand, location, etc)
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

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory.categoryName || ""} onChange={handleCategorySelect}>
          {mapCategoryMenuItems()}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Sub Category</InputLabel>
        {subCategories.length > 0 && (
          <Select value={selectedSubCat.subCategoryName || ""} onChange={handleSubCatSelect}>
            {mapSubCatMenuItems()}
          </Select>
        )}
      </FormControl>
    </div>
  );
};

export default CatSubCatSelector;
