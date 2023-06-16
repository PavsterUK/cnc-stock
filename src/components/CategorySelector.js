import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const CategorySelector = () => {
  const [category, setCategory] = useState();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">All Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          defaultValue={category}
          label="category"
          onChange={handleChange}
          sx={{ width: "13rem" }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CategorySelector;
