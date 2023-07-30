import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import categories from "./categories";

const CategorySelector = ({ searchCategory, setItemCategory }) => {
  const handleChange = (event) => {
    setItemCategory(event.target.value);
  };

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
          {categories.map((category) => (
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
