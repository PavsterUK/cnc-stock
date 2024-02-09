import React, { useState, useContext, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CategoriesContext } from "./CategoriesContext";
import AddEditSubcat from "./AddEditSubcat";
import AddEditCategory from "./AddEditCategory";
import { ListItem } from "@mui/material";

function CategoryListItem({ category }) {
  const [open, setOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const { fetchSubCategoriesByCategoryId, addSubcategory } = useContext(CategoriesContext);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const subCatList = await fetchSubCategoriesByCategoryId(category.id);
        if (subCatList.length > 1) subCatList.shift();
        setSubCategories(subCatList);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    if (open) {
      // Only fetch if the category is open
      fetchSubcategories();
    }
  }, [open, category.id, fetchSubCategoriesByCategoryId]);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <AddEditCategory name={category.categoryName} isEditMode />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subCategories.map((subCategory) => (
            <ListItem key={subCategory.id} sx={{ marginLeft: "2em" }}>
              <AddEditSubcat name={subCategory.subCategoryName} isEditMode color={"warning"} />
            </ListItem>
          ))}
          <ListItem key={performance.now()} sx={{ marginLeft: "2em" }}>
            <AddEditSubcat name={"Add New Subcategory"} categoryId={category.id} color={"warning"} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default CategoryListItem;
