import React, { useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import { Typography, Button, TextField, Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material/";
import axios from "axios";
import DeleteConfirmDialog from "../PopUpDialogs/DeleteConfirmDialog";
import { BASE_URL } from "../../constants/config";
import MaterialsSelector from "../MaterialsSelector";
import CatSubCatSelector from "../Categories/CatSubCatSelector";
import { CategoriesContext } from "../Categories/CategoriesContext";
import CloseWindow from "../UI/CloseWindow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  maxWidth: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddOrEditStockItem({ stockItemData = {}, isEditMode = false, setStockItems, stockItems }) {
  const { allCategoriesOption, allSubCategoriesOption } = useContext(CategoriesContext);

  const defaultSelectedCategory = stockItemData
    ? {
        categoryName: stockItemData.categoryName,
        id: stockItemData.categoryId,
      }
    : allCategoriesOption;

  const defaultSelectedSubCategory = stockItemData
    ? {
        subCategoryName: stockItemData.subCategoryName,
        id: stockItemData.subCategoryId,
        categoryId: stockItemData.categoryId,
      }
    : allSubCategoriesOption;

  const [open, setOpen] = useState(false);
  const [itemCodeOrTitle, setItemCodeOrTitle] = useState(stockItemData.title || "");
  const [brand, setBrand] = useState(stockItemData.brand || "");
  const [itemDescription, setItemDescription] = useState(stockItemData.description || "");
  const [itemLocation, setItemLocation] = useState(stockItemData.location || "");
  const [supplier, setSupplier] = useState(stockItemData.supplier || "");
  const [supplierItemCode, setSupplierItemCode] = useState(stockItemData.supplierItemCode || "");
  const [selectedCategory, setSelectedCategory] = useState(defaultSelectedCategory);
  const [selectedSubCat, setSelectedSubCat] = useState(defaultSelectedSubCategory);
  const [minQty, setMinQty] = useState(stockItemData.minQty || 0);
  const [stockQty, setStockQty] = useState(stockItemData.stockQty || 0);
  const [isConstantStock, setIsConstantStock] = useState(stockItemData.constantStock || false);
  const [restockQty, setRestockQty] = useState(stockItemData.restockQty || 0);
  const [selectedMaterials, setSelectedMaterials] = useState(stockItemData.materials || []);

  // Error states
  const [itemCodeOrTitleError, setItemCodeOrTitleError] = useState(false);
  const [itemLocationError, setItemLocationError] = useState(false);
  const [supplierError, setSupplierError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    !isEditMode && resetForm();
  };

  const handleInputChange = (e, stateSetter, setError) => {
    const value = e.target.value;
    stateSetter(value);
    setError && setError(value.trim().length === 0);
  };

  const resetForm = () => {
    setItemCodeOrTitle(stockItemData.title || "");
    setBrand(stockItemData.brand || "");
    setItemDescription(stockItemData.description || "");
    setItemLocation(stockItemData.location || "");
    setSupplier(stockItemData.supplier || "");
    setSupplierItemCode(stockItemData.supplierItemCode || "");
    setSelectedCategory(stockItemData.category || "");
    setSelectedSubCat(stockItemData.subCategory || "");
    setMinQty(stockItemData.minQty || "");
    setStockQty(stockItemData.stockQty || "");
    setRestockQty(stockItemData.restockQty || "");
    setIsConstantStock(stockItemData.constantStock || false);
    setSelectedMaterials(stockItemData.materials || []);
    resetAllErrors();
  };

  const resetAllErrors = () => {
    setItemCodeOrTitleError(false);
    setItemLocationError(false);
    setSupplierError(false);
    setCategoryError(false);
    setSubCategoryError(false);
    setErrorMessage("");
  };

  const isFormFilled = () => {
    return (
      itemCodeOrTitle.trim().length === 0 &&
      itemLocation.toString().trim().length === 0 &&
      supplier.trim().length === 0 &&
      minQty.toString().trim().length === 0
    );
  };

  const handleSendRequest = () => {
    if (isFormFilled()) {
      return setErrorMessage("Please fill all boxes with asterix *");
    }

    const itemData = {
      id: stockItemData.id,
      title: itemCodeOrTitle,
      brand: brand,
      description: itemDescription,
      location: itemLocation,
      supplier: supplier,
      supplierItemCode: supplierItemCode,
      categoryName: selectedCategory.categoryName,
      categoryId: selectedCategory.id,
      subCategoryId: selectedSubCat.id,
      subCategoryName: selectedSubCat.subCategoryName,
      minQty: minQty,
      constantStock: isConstantStock,
      materials: selectedMaterials,
      stockQty: stockQty,
      restockQty: restockQty,
    };

    if (isEditMode) {
      // If in edit mode, update the existing item
      axios
        .put(`${BASE_URL}/api/stock-item/${stockItemData.id}`, itemData)
        .then((response) => {
          const updatedItem = response.data;
          handleClose();
          setStockItems((prevItems) => prevItems.map((item) => (item.id === stockItemData.id ? updatedItem : item)));
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("Error occurred when saving new item.");
          }
        });
    } else {
      // If not in edit mode, create a new item
      axios
        .post(`${BASE_URL}/api/stock-item`, itemData)
        .then((response) => {
          setStockItems((prevItems) => [...prevItems, response.data]);
          handleClose();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("Error occurred when saving new item.");
          }
        });
    }
  };

  const handleDeleteItem = () => {
    axios
      .delete(`${BASE_URL}/api/stock-item/${stockItemData.id}`)
      .then((response) => {
        // Handle success
        console.log("Response " + response);
        const updatedStockItems = stockItems.filter((item) => item.id !== stockItemData.id);
        setStockItems(updatedStockItems);
        handleClose();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Error occurred while trying to delete item.");
        }
      });
  };

  return (
    <>
      <Button color="secondary" variant={isEditMode ? "text" : "contained"} onClick={handleOpen} fullWidth>
        {isEditMode ? "Edit Item" : "New Stock Item"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={style}>
          <CloseWindow handleClose={handleClose} />
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h5" component="h2" align="center" style={{ fontWeight: "bold" }}>
              {isEditMode ? "UPDATE ITEM INFO" : "ADD A NEW ITEM TO THE STOCK LIST"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Item Code or Title"
              value={itemCodeOrTitle}
              onChange={(e) => handleInputChange(e, setItemCodeOrTitle, setItemCodeOrTitleError)}
              onBlur={(e) => handleInputChange(e, setItemCodeOrTitle, setItemCodeOrTitleError)}
              error={itemCodeOrTitleError}
              helperText={itemCodeOrTitleError && "Field cannot be empty"}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Item description"
              multiline
              rows={2}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Supplier"
              value={supplier}
              onChange={(e) => handleInputChange(e, setSupplier, setSupplierError)}
              onBlur={(e) => handleInputChange(e, setSupplier, setSupplierError)}
              error={supplierError}
              helperText={supplierError && "Field cannot be empty"}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <CatSubCatSelector
              isSaveorUpdateMode
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCat={selectedSubCat}
              setSelectedSubCat={setSelectedSubCat}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MaterialsSelector selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials} />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Supplier Item Code"
              value={supplierItemCode}
              onChange={(e) => handleInputChange(e, setSupplierItemCode)}
            />
          </Grid>

          <Grid item xs={6} md={2} lg={2}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Alert Threshold"
              type="number"
              inputProps={{ min: 0 }}
              value={minQty}
              onChange={(e) => handleInputChange(e, setMinQty)}
            />
          </Grid>

          <Grid item xs={6} md={2} lg={2}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Stock Qty"
              type="number"
              inputProps={{ min: 0 }}
              value={stockQty}
              onChange={(e) => handleInputChange(e, setStockQty)}
            />
          </Grid>
          <Grid item xs={6} md={2} lg={2}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Restock Qty"
              type="number"
              inputProps={{ min: 0 }}
              value={restockQty}
              onChange={(e) => handleInputChange(e, setRestockQty)}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              inputProps={{ min: 0 }}
              id="outlined-required"
              label="Item Location"
              value={itemLocation}
              onChange={(e) => handleInputChange(e, setItemLocation, setItemLocationError)}
              onBlur={(e) => handleInputChange(e, setItemLocation, setItemLocationError)}
              error={itemLocationError}
              helperText={itemLocationError && "Field cannot be empty"}
            />
          </Grid>
          <Grid item xs={6} md={2} lg={2}>
            <FormGroup>
              <FormControlLabel
                label="CONSTANT STOCK"
                control={<Checkbox checked={isConstantStock} onChange={(e) => setIsConstantStock(e.target.checked)} />}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Grid>

          <Grid sx={{ marginTop: "1em", paddingTop: "0 !important" }} item xs={12} md={12} lg={12}>
            <Button onClick={handleSendRequest} fullWidth variant="contained">
              {isEditMode ? "update item" : "add new item"}
            </Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {isEditMode && (
              <DeleteConfirmDialog
                handleCloseParent={handleClose}
                handleDeleteItem={handleDeleteItem}
                itemTitle={stockItemData.title}
              />
            )}
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
