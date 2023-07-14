import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material/";
import FormControl from "@mui/material/FormControl";
import AlertDialog from "./AlertDialog";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
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

export default function AddNewStockItem({ AddNewStockItemOpenOpen }) {
  const [open, setOpen] = React.useState(AddNewStockItemOpenOpen);
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
      <Button variant="outlined" align="center" onClick={handleOpen} fullWidth>
        Add New Item
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          ></Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography
                    variant="h6"
                    component="h2"
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    Add a New Item To Stock
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      fullWidth
                      required
                      id="outlined-required"
                      label="Item Code or Title"
                    />
                    <TextField
                      fullWidth
                      required
                      id="outlined-required"
                      label="Item description"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Item Location"
                      sx={{ maxWidth: "20ch" }}
                    />
                    <TextField
                      id="outlined-required"
                      label="Brand"
                      sx={{ maxWidth: "20ch" }}
                    />
                    <div>
                      <TextField
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
                    </div>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <AlertDialog
                    onClick={handleSendRequest}
                    name={"Add Item"}
                    handleCloseParent={handleClose}
                    dialogTitle={"New Item Added!"}
                    dialogMessage={
                      "Added Item will now appear on the stock list. Thank you!"
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
}
