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
  {
    value: "Turning",
  },
  {
    value: "Milling",
  },
  {
    value: "Hole Making",
  },
  {
    value: "Measuring and Inspection",
  },
  {
    value: "Workholding and Fixturing",
  },
  {
    value: "Machine Accessories",
  },
  {
    value: "Tool Storage and Organization",
  },
  {
    value: "Safety Equipment",
  },
  {
    value: "Miscellaneous",
  },
  {
    value: "Other",
  },
];

export default function AddNewStockItem() {
  const [open, setOpen] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemCategory("");
  };
  const [selectedAttributes, setSelectedAttributes] = React.useState([]);

  // State variables for text fields
  const [itemCodeOrTitle, setItemCodeOrTitle] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [itemDescription, setItemDescription] = React.useState("");
  const [itemLocation, setItemLocation] = React.useState("");
  const [supplier, setSupplier] = React.useState("");
  const [itemCategory, setItemCategory] = React.useState("");
  const [minQty, setMinQty] = React.useState("");
  const [otherCategory, setOtherCategory] = React.useState(false);

  // State variable for checkboxes
  const [isConstantStock, setIsConstantStock] = React.useState(false);

  // State variables for field validation
  const [itemCodeOrTitleError, setItemCodeOrTitleError] = React.useState(true);
  const [itemLocationError, setItemLocationError] = React.useState(true);
  const [supplierError, setSupplierError] = React.useState(true);
  const [minQtyError, setMinQtyError] = React.useState(true);
  const [itemCategoryError, setItemCategoryError] = React.useState(true);

  const handleAttributeChange = (event) => {
    setSelectedAttributes(event.target.value);
  };

  const handleSendRequest = () => {
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" align="center" onClick={handleOpen} fullWidth>
        Add New Item
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
              ADD A NEW ITEM TO THE STOCK LIST
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Item Code or Title"
              value={itemCodeOrTitle}
              onChange={(e) => setItemCodeOrTitle(e.target.value)}
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
              onChange={(e) => setItemLocation(e.target.value)}
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
              onChange={(e) => setSupplier(e.target.value)}
              error={supplierError}
              helperText={supplierError && "Field cannot be empty"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              required
              select
              label="Choose item Category"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              error={itemCategory ? false : true}
              helperText={!itemCategory && "Field cannot be empty"}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.value}>
                  {category.value}
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
              onChange={(e) => setMinQty(e.target.value)}
              error={minQtyError}
              helperText={minQtyError && "Field cannot be empty"}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <FormGroup>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    checked={isConstantStock}
                    onChange={(e) => setIsConstantStock(e.target.checked)}
                  />
                }
                label="Constant Stock"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AlertDialog
              onClick={handleSendRequest}
              name={"Add Item"}
              handleCloseParent={handleClose}
              dialogTitle={"New Item Added!"}
              dialogMessage={
                "Added Item will now appear on the stock list. Thank you!"
              }
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
