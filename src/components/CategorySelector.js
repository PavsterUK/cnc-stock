import { React, useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import categories from "./categories";

const CategorySelector = ({ searchCategory, setItemCategory }) => {
  const [newCategories, setNewCategories] = useState(categories);

  const handleChange = (event) => {
    setItemCategory(event.target.value);
  };

  useEffect(() => {
    const stockItemProps = ["Description", "Supplier", "Location", "Brand"];
    const insertionIndex = 1;
    const newArray = [
      ...categories.slice(0, insertionIndex),
      ...stockItemProps,
      ...categories.slice(insertionIndex),
    ];
    setNewCategories(newArray);
  }, []);

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchCategory}
          defaultValue={categories[0]}
          label="category"
          onChange={handleChange}
          sx={{ width: "13rem" }}
        >
          {newCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategorySelector;
