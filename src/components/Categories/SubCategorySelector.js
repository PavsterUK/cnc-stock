import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BASE_URL from "../baseURL";

const SubCategorySelector = ({
  setUserSelectedSubCategory,
  userSelectedCategory,
}) => {
  const [fetchedSubCategories, setFetchedSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/subcategories/${userSelectedCategory.categoryId}`
        );
        setFetchedSubCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sub categories:", error);
      }
    };
    fetchSubCategories();
  }, [userSelectedCategory]);

  const handleChange = (event) => {
    setUserSelectedSubCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Sub</InputLabel>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Select value={fetchedSubCategories[0].subCategoryName} onChange={handleChange}>
          {fetchedSubCategories.map((subCategory) => (
            <MenuItem key={subCategory.id} value={subCategory.subCategoryName}>
              {subCategory.subCategoryName}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default SubCategorySelector;
