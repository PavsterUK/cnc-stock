import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material/";
import FormControl from "@mui/material/FormControl";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialog from "./AlertDialog";

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

const categories = [
  "Turning",
  "Milling",
  "Hole Making",
  "Measuring and Inspection",
  "Workholding and Fixturing",
  "Machine Accessories",
  "Tool Storage and Organization",
  "Safety Equipment",
  "Miscellaneous",
  "Other",
];

export default function AddOrEditStockItem({
  stockItemData = {},
  isEditMode = false,
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
  const [minQty, setMinQty] = React.useState(stockItemData.minQty || "");
  const [isConstantStock, setIsConstantStock] = React.useState(
    stockItemData.isConstantStock || false
  );
  const [selectedAttributes, setSelectedAttributes] = React.useState(
    stockItemData.materials || []
  );

  // Error states
  const [itemCodeOrTitleError, setItemCodeOrTitleError] = React.useState(false);
  const [itemLocationError, setItemLocationError] = React.useState(false);
  const [supplierError, setSupplierError] = React.useState(false);
  const [categoryError, setCategoryError] = React.useState(false);
  const [minQtyError, setMinQtyError] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleInputChange = (e, stateSetter, setError) => {
    const value = e.target.value;
    stateSetter(value);
    setError(value.trim().length === 0);
  };

  const handleAttributeChange = (event) => {
    setSelectedAttributes(event.target.value);
  };

  const resetForm = () => {
    setItemCodeOrTitle(stockItemData.title || "");
    setBrand(stockItemData.brand || "");
    setItemDescription(stockItemData.description || "");
    setItemLocation(stockItemData.location || "");
    setSupplier(stockItemData.supplier || "");
    setItemCategory(stockItemData.category || "");
    setMinQty(stockItemData.minQty || "");
    setIsConstantStock(stockItemData.isConstantStock || false);
    setSelectedAttributes(stockItemData.materials || []);
    resetAllErrors();
  };

  const resetAllErrors = () => {
    setItemCodeOrTitleError(false);
    setItemLocationError(false);
    setSupplierError(false);
    setCategoryError(false);
    setMinQtyError(false);
  };

  const areAllFieldsFilled = () => {
    return (
      itemCodeOrTitle.trim().length > 0 &&
      itemLocation.toString().trim().length > 0 &&
      supplier.trim().length > 0 &&
      itemCategory.trim().length > 0 &&
      minQty.toString().trim().length > 0
    );
  };

  const handleSendRequest = () => {
    //Sent data to api
  };

  return (
    <>
      <Button variant="outlined" align="center" onClick={handleOpen} fullWidth>
        {isEditMode ? <EditIcon /> : "Add New Item"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={style}>
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
            <FormControl fullWidth>
              <InputLabel id="item-attributes-label">
                Suitable Materials
              </InputLabel>
              <Select
                label="Suitable Materials"
                labelId="item-attributes-label"
                id="item-attributes-select"
                multiple
                value={selectedAttributes}
                onChange={handleAttributeChange}
              >
                <MenuItem
                  value="P"
                  sx={{
                    backgroundColor: selectedAttributes.includes("P")
                      ? "#0eb6f7 !important"
                      : "transparent",
                    color: selectedAttributes.includes("P")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Mild Steel
                </MenuItem>
                <MenuItem
                  value="M"
                  sx={{
                    backgroundColor: selectedAttributes.includes("M")
                      ? "#f6ea02 !important"
                      : "transparent",
                  }}
                >
                  Stainless
                </MenuItem>
                <MenuItem
                  value="K"
                  sx={{
                    backgroundColor: selectedAttributes.includes("K")
                      ? "#e31c1e !important"
                      : "transparent",
                    color: selectedAttributes.includes("K")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Cast Iron
                </MenuItem>
                <MenuItem
                  value="N"
                  sx={{
                    backgroundColor: selectedAttributes.includes("N")
                      ? "#2dc65b !important"
                      : "transparent",
                    color: selectedAttributes.includes("N")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Non Ferrous
                </MenuItem>
                <MenuItem
                  value="S"
                  sx={{
                    backgroundColor: selectedAttributes.includes("S")
                      ? "#f77b00 !important"
                      : "transparent",
                    color: selectedAttributes.includes("S")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Super Alloy
                </MenuItem>
                <MenuItem
                  value="H"
                  sx={{
                    backgroundColor: selectedAttributes.includes("H")
                      ? "#bababa !important"
                      : "transparent",
                    color: selectedAttributes.includes("H")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Hardened Steel
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Min Qty"
              value={minQty}
              onChange={(e) => handleInputChange(e, setMinQty, setMinQtyError)}
              onBlur={(e) => handleInputChange(e, setMinQty, setMinQtyError)}
              error={minQtyError}
              helperText={minQtyError && "Field cannot be empty"}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <FormGroup>
              <FormControlLabel
                label="CON STOCK"
                control={
                  <Checkbox
                    checked={isConstantStock}
                    onChange={(e) => setIsConstantStock(e.target.checked)}
                  />
                }
              />
            </FormGroup>
          </Grid>

          <Grid
            sx={{ marginTop: "1em", paddingTop: "0 !important" }}
            item
            xs={12}
            md={12}
            lg={12}
          >
            <AlertDialog
              name={isEditMode ? "Update Info" : "Add Item"}
              handleCloseParent={handleClose}
              handleSendRequest={handleSendRequest}
              dialogTitle={
                isEditMode ? "Item Info Updated!" : "New Item Added!"
              }
              dialogMessage={
                isEditMode
                  ? "Item info has been updated successfully."
                  : "Added Item will now appear on the stock list. Thank you!"
              }
              areAllFieldsFilled={areAllFieldsFilled}
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
