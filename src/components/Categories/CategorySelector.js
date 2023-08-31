import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useCategoryContext } from "./CategoryContext";

const CategorySelector = ({
  userSelectedCategory,
  setUserSelectedCategory,
}) => {
  const { categories } = useCategoryContext();


  console.log(categories);

  const handleChange = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategoryId = categories.find(
      (category) => category.categoryName === selectedCategoryName
    )?.id;

    setUserSelectedCategory({
      categoryName: selectedCategoryName,
      categoryId: selectedCategoryId,
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>

      <Select value={userSelectedCategory.categoryName} onChange={handleChange}>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.categoryName}>
            {category.categoryName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelector;
