import React, { useContext } from "react";
import List from "@mui/material/List";
import { CategoriesContext } from "./CategoriesContext";
import CategoryListItem from "./CategoryListItem";
import { STOCK_ITEM_PROPS } from "../../constants/stockItemConstants";
import AddEditCategory from "./AddEditCategory";

export default function ListManager() {
  const { categories } = useContext(CategoriesContext);

  const filteredCategories = categories.filter(
    (category) => !STOCK_ITEM_PROPS.includes(category.categoryName.toLowerCase())
  );

  if (filteredCategories.length > 0) {
    // Remove "all categories" from the array
    filteredCategories.shift();
  }

  return (
    <List
      sx={{ width: "fit-content", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {filteredCategories.map((category) => (
        <CategoryListItem key={category.id} category={category} />
      ))}
      <AddEditCategory key={performance.now()} name={"Add New Category"} />
    </List>
  );
}
