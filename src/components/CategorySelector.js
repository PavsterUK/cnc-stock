import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BASE_URL from "./baseURL";

const CategorySelector = ({ userSelectedCategory, setUserSelectedCategory }) => {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        setFetchedCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategoryId = fetchedCategories.find(
      (category) => category.categoryName === selectedCategoryName
    )?.id;

    setUserSelectedCategory({
      categoryName: selectedCategoryName,
      categoryId: selectedCategoryId
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Select
          value={userSelectedCategory.categoryName}
          onChange={handleChange}
        >
          {fetchedCategories.map((category) => (
            <MenuItem key={category.id} value={category.categoryName}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default CategorySelector;
