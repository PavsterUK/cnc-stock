import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  position: "absolute",
  left: "1%",
  top: "1%",
};

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddCategory = () => {
    if (categoryInput) {
      setCategories([...categories, { name: categoryInput, subcategories: [] }]);
      setCategoryInput("");
    }
  };

  const handleAddSubcategory = () => {
    if (subCategoryInput && selectedCategoryIndex >= 0) {
      const newCategories = [...categories];
      newCategories[selectedCategoryIndex].subcategories.push(subCategoryInput);
      setCategories(newCategories);
      setSubCategoryInput("");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={buttonStyle}>
        Manage Categories
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryManager;
