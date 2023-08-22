import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import BASE_URL from "./baseURL";
import categories from "./categories";
import MaterialsSelector from "./MaterialsSelector";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  maxWidth: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddOrEditStockItem({
  stockItemData = {},
  isEditMode = false,
  setStockItems,
  stockItems,
}) {
  const [open, setOpen] = React.useState(false);
  const [itemCodeOrTitle, setItemCodeOrTitle] = React.useState(
    stockItemData.title || ""
  );
  const [brand, setBrand] = React.useState(stockItemData.brand || "");
  const [itemDescription, setItemDescription] = React.useState(
    stockItemData.description || ""
  );
  const [itemLocation, setItemLocation] = React.useState(
    stockItemData.location || ""
  );
  const [supplier, setSupplier] = React.useState(stockItemData.supplier || "");
  const [itemCategory, setItemCategory] = React.useState(
    stockItemData.category || ""
  );
  const [minQty, setMinQty] = React.useState(stockItemData.minQty || 0);
  const [stockQty, setStockQty] = React.useState(stockItemData.stockQty || 0);
  const [isConstantStock, setIsConstantStock] = React.useState(
    stockItemData.constantStock || false
  );
  const [restockQty, setRestockQty] = React.useState(
    stockItemData.restockQty || 0
  );

  const [selectedMaterials, setSelectedMaterials] = React.useState(
    stockItemData.materials || []
  );
  const databaseId = stockItemData.id || null;

  // Error states
  const [itemCodeOrTitleError, setItemCodeOrTitleError] = React.useState(false);
  const [itemLocationError, setItemLocationError] = React.useState(false);
  const [supplierError, setSupplierError] = React.useState(false);
  const [categoryError, setCategoryError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    resetForm();
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
    setItemCategory(stockItemData.category || "");
    setMinQty(stockItemData.minQty || "");
    setIsConstantStock(stockItemData.constantStock || false);
    setSelectedMaterials(stockItemData.materials || []);
    resetAllErrors();
  };

  const resetAllErrors = () => {
    setItemCodeOrTitleError(false);
    setItemLocationError(false);
    setSupplierError(false);
    setCategoryError(false);
    setErrorMessage("");
  };

  const isFormFilled = () => {
    return (
      itemCodeOrTitle.trim().length === 0 &&
      itemLocation.toString().trim().length === 0 &&
      supplier.trim().length === 0 &&
      itemCategory.trim().length === 0 &&
      minQty.toString().trim().length === 0
    );
  };

  const handleSendRequest = () => {
    if (isFormFilled()) {
      return setErrorMessage("Please fill all boxes with asterix *");
    }

    const itemData = {
      id: databaseId,
      title: itemCodeOrTitle,
      brand: brand,
      description: itemDescription,
      location: itemLocation,
      supplier: supplier,
      category: itemCategory,
      minQty: minQty,
      isConstantStock: isConstantStock,
      materials: selectedMaterials,
      stockQty: stockQty,
      restockQty: restockQty,
    };

    if (isEditMode) {
      // If in edit mode, update the existing item
      axios
        .put(`${BASE_URL}/api/stock-item/${stockItemData.id}`, itemData)
        .then((response) => {
          // Handle success
          handleClose();
          setStockItems((prevItems) =>
            prevItems.map((item) =>
              item.id === stockItemData.id ? itemData : item
            )
          );
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
            console.log(error.response.data);
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
        console.log("Response "+ response);
        const updatedStockItems = stockItems.filter(
          (item) => item.id !== stockItemData.id
        );
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
      <Button variant="contained" align="center" onClick={handleOpen} fullWidth>
        {isEditMode ? <EditIcon /> : "New Stock Item"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={style}>
          {isEditMode && (
            <DeleteConfirmDialog
              handleCloseParent={handleClose}
              handleDeleteItem={handleDeleteItem}
              itemTitle={stockItemData.title}
            />
          )}

          <Grid item xs={12} md={12} lg={12}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              {isEditMode
                ? "UPDATE ITEM INFO"
                : "ADD A NEW ITEM TO THE STOCK LIST"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Item Code or Title"
              value={itemCodeOrTitle}
              onChange={(e) =>
                handleInputChange(
                  e,
                  setItemCodeOrTitle,
                  setItemCodeOrTitleError
                )
              }
              onBlur={(e) =>
                handleInputChange(
                  e,
                  setItemCodeOrTitle,
                  setItemCodeOrTitleError
                )
              }
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
              type="number"
              inputProps={{ min: 0 }}
              id="outlined-required"
              label="Item Location"
              value={itemLocation}
              onChange={(e) =>
                handleInputChange(e, setItemLocation, setItemLocationError)
              }
              onBlur={(e) =>
                handleInputChange(e, setItemLocation, setItemLocationError)
              }
              error={itemLocationError}
              helperText={itemLocationError && "Field cannot be empty"}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Supplier"
              value={supplier}
              onChange={(e) =>
                handleInputChange(e, setSupplier, setSupplierError)
              }
              onBlur={(e) =>
                handleInputChange(e, setSupplier, setSupplierError)
              }
              error={supplierError}
              helperText={supplierError && "Field cannot be empty"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              required
              select
              label="Choose item Category"
              value={itemCategory}
              onChange={(e) =>
                handleInputChange(e, setItemCategory, setCategoryError)
              }
              onBlur={(e) =>
                handleInputChange(e, setItemCategory, setCategoryError)
              }
              error={categoryError}
              helperText={categoryError && "Field cannot be empty"}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MaterialsSelector
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Alert Threshold Qty"
              type="number"
              inputProps={{ min: 0 }}
              value={minQty}
              onChange={(e) => handleInputChange(e, setMinQty)}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <FormGroup>
              <FormControlLabel
                label="CONSTANT STOCK"
                control={
                  <Checkbox
                    checked={isConstantStock}
                    onChange={(e) => setIsConstantStock(e.target.checked)}
                  />
                }
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
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
          <Grid item xs={6} md={3} lg={3}>
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
          <Grid item xs={12} md={12} lg={12}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Grid>

          <Grid
            sx={{ marginTop: "1em", paddingTop: "0 !important" }}
            item
            xs={12}
            md={12}
            lg={12}
          >
            <Button onClick={handleSendRequest} fullWidth variant="contained">
              {isEditMode ? "update item" : "add new item"}
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
