import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
          defaultValue="all"
          label="category"
          onChange={handleChange}
          sx={{ width: "13rem" }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value={"Turning"}>Turning</MenuItem>
          <MenuItem value={"Milling"}>Milling</MenuItem>
          <MenuItem value={"Hole Making"}>Hole Making</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CategorySelector;
