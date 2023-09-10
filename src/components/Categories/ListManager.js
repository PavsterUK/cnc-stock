import React, { useContext } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { CategoriesContext } from "./CategoriesContext";
import CategoryListItem from "./CategoryListItem";

export default function ListManager() {
  const { categories } = useContext(CategoriesContext);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Stock Categories
        </ListSubheader>
      }
    >
      {categories.map((category) => (
        <CategoryListItem key={category.id} category={category} />
      ))}
    </List>
  );
}
