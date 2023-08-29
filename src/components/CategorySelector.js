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

const CategorySelector = ({ itemCategory, setItemCategory }) => {
  const [itemsCategories, setItemsCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        setItemsCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setItemCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Select
          value={itemCategory}
          onChange={handleChange}
        >
          {itemsCategories.map((category) => (
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
