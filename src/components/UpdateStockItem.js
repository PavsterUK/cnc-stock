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
} from "@mui/material/";
import FormControl from "@mui/material/FormControl";
import AlertDialog from "./AlertDialog";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
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
    value: "Other",
  },
];

export default function AddNewStockItem({ stockItemData }) {
  const [open, setOpen] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedAttributes, setSelectedAttributes] = React.useState([]);

  const handleAttributeChange = (event) => {
    setSelectedAttributes(event.target.value);
  };

  const handleSendRequest = () => {
    handleClose();
  };

  return (
    <>
      <Button
        sx={{ position: "absolute", top: "0", right: "0" }}
        variant="text"
        align="center"
        color="info"
        onClick={handleOpen}
      >
        <EditIcon />
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
              Update Item Info
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Item Code or Title"
              value={stockItemData.title}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Brand"
              value={stockItemData.brand}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Item description"
              multiline
              rows={2}
              value={stockItemData.description}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Item Location"
              value={stockItemData.location}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Supplier"
              value={stockItemData.supplier}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Choose item Category"
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
                value={stockItemData.materials}
                onChange={handleAttributeChange}
              >
                <MenuItem
                  value="P"
                  sx={{
                    backgroundColor: stockItemData.materials.includes("P")
                      ? "#0eb6f7 !important"
                      : "transparent",
                    color: stockItemData.materials.includes("P")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Mild Steel
                </MenuItem>
                <MenuItem
                  value="M"
                  sx={{
                    backgroundColor: stockItemData.materials.includes("M")
                      ? "#f6ea02 !important"
                      : "transparent",
                  }}
                >
                  Stainless
                </MenuItem>
                <MenuItem
                  value="K"
                  sx={{
                    backgroundColor: stockItemData.materials.includes("K")
                      ? "#e31c1e !important"
                      : "transparent",
                    color: stockItemData.materials.includes("K")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Cast Iron
                </MenuItem>
                <MenuItem
                  value="N"
                  sx={{
                    backgroundColor: stockItemData.materials.includes("N")
                      ? "#2dc65b !important"
                      : "transparent",
                    color: stockItemData.materials.includes("N")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Non Ferrous
                </MenuItem>
                <MenuItem
                  value="S"
                  sx={{
                    backgroundColor: stockItemData.materials.includes("S")
                      ? "#f77b00 !important"
                      : "transparent",
                    color: stockItemData.materials.includes("S")
                      ? "white !important"
                      : "black",
                  }}
                >
                  Super Alloy
                </MenuItem>
                <MenuItem
                  value="H"
                  sx={{
                    backgroundColor: stockItemData.materials.includes("H")
                      ? "#bababa !important"
                      : "transparent",
                    color: stockItemData.materials.includes("H")
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
              label="Red Alert Qty"
              value={stockItemData.minQty}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Amber Alert Qty"
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AlertDialog
              onClick={handleSendRequest}
              name={"Update Info"}
              handleCloseParent={handleClose}
              dialogTitle={"Item Info Has Been Updated!"}
              dialogMessage={
                "Updated Item will now appear on the stock list. Thank you!"
              }
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
