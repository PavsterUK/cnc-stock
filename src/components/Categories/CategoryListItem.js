import React, { useState, useContext, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CategoriesContext } from "./CategoriesContext";

function CategoryListItem({ category }) {
  const [open, setOpen] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const { fetchSubCategoriesByCategoryId } = useContext(CategoriesContext);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const subCatList = await fetchSubCategoriesByCategoryId(category.id);
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
        <ListItemText primary={category.categoryName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subCategories.map((subCategory) => (
            <ListItemButton key={subCategory.id} sx={{ pl: 4 }}>
              <ListItemText primary={subCategory.subCategoryName} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default CategoryListItem;
