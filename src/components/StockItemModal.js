import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { HorizontalRule, Add } from "@mui/icons-material";
import styles from "./StockItemModal.module.css";
import AddOrEditStockItem from "./AddOrEditStockItem";
import axios from "axios";
import BASE_URL from "./baseURL";

const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default function StockItemModal({
  stockItemData,
  setStockItems,
  stockItems,
}) {
  const [open, setOpen] = React.useState(false);
  const [isTake, setIsTake] = React.useState(true);
  const [vendQty, setVendQty] = React.useState(1);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFeedbackMessage("");
  };

  const decreaseNumber = () => {
    setVendQty((prevNumber) => (prevNumber > 1 ? prevNumber - 1 : 1));
  };

  const increaseNumber = () => {
    setVendQty((prevNumber) => prevNumber + 1);
  };

  const handleToggleTakeorReturn = () => {
    setIsTake(!isTake);
  };

  const handleVending = (vendQty, isTake) => {
    if (isTake) {
      const newStockQty = stockItemData.stockQty - vendQty;
      if (newStockQty < 0) {
        return setFeedbackMessage(`Bloody hell mate, can't you do basic math?`);
      } else {
        stockItemData.stockQty = newStockQty; // Update stockQty
      }
    } else {
      stockItemData.stockQty += vendQty;
    }

    axios
      .put(
        `${BASE_URL}/api/stock-item/${stockItemData.location}`,
        stockItemData
      )
      .then((response) => {
        // Handle success
        setFeedbackMessage(
          `You ${isTake ? "took" : "returned"} ${vendQty} item(s).`
        );
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setFeedbackMessage(error.response.data);
        } else {
          setFeedbackMessage(
            `Error occurred ${isTake ? "taking" : "returning"} item.`
          );
        }
      });
  };

  return (
    <div className={styles.container}>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleOpen}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          color: "#fff",
          textTransform: "capitalize",
          height: "100%!important",
        }}
      >
        <div className={styles.location}>
          <div className={styles.location__title}>Stock Qty</div>
          <div className={styles.location__value}>{stockItemData.stockQty}</div>
        </div>
        <h2 className={styles.itemTitle}>{stockItemData.title}</h2>
        <div className={styles.itemMaterials}>
          <div
            style={{
              backgroundColor: stockItemData.materials.includes("P")
                ? "#0eb6f7"
                : "transparent",
            }}
            className={styles.itemMaterials__p}
          ></div>
          <div
            style={{
              backgroundColor: stockItemData.materials.includes("M")
                ? "#f6ea02"
                : "transparent",
            }}
            className={styles.itemMaterials__m}
          ></div>
          <div
            style={{
              backgroundColor: stockItemData.materials.includes("K")
                ? "#e31c1e"
                : "transparent",
            }}
            className={styles.itemMaterials__k}
          ></div>
          <div
            style={{
              backgroundColor: stockItemData.materials.includes("N")
                ? "#2dc65b"
                : "transparent",
            }}
            className={styles.itemMaterials__n}
          ></div>
          <div
            style={{
              backgroundColor: stockItemData.materials.includes("S")
                ? "#f77b00"
                : "transparent",
            }}
            className={styles.itemMaterials__s}
          ></div>
          <div
            style={{
              backgroundColor: stockItemData.materials.includes("H")
                ? "#bababa"
                : "transparent",
            }}
            className={styles.itemMaterials__h}
          ></div>
        </div>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={styles.editButtonWrapper}>
            <AddOrEditStockItem
              isEditMode
              stockItemData={stockItemData}
              setStockItems={setStockItems}
              stockItems={stockItems}
            />
          </div>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            margin={"1em"}
            component="h2"
            align="center"
          >
            {stockItemData.title}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                    component="h6"
                    align="center"
                  >
                    Description
                  </Typography>
                </TableCell>
                <TableCell colSpan={7}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="p"
                    component="p"
                    align="left"
                  >
                    {stockItemData.description}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                    component="h6"
                    align="center"
                  >
                    Materials
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: stockItemData.materials.includes("P")
                      ? "#0eb6f7 !important"
                      : "transparent",
                    color: stockItemData.materials.includes("P")
                      ? "white !important"
                      : "black",
                  }}
                  align="center"
                >
                  P
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: stockItemData.materials.includes("M")
                      ? "#f6ea02 !important"
                      : "transparent",
                  }}
                  align="center"
                >
                  M
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: stockItemData.materials.includes("K")
                      ? "#e31c1e !important"
                      : "transparent",
                    color: stockItemData.materials.includes("K")
                      ? "white !important"
                      : "black",
                  }}
                  align="center"
                >
                  K
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: stockItemData.materials.includes("N")
                      ? "#2dc65b !important"
                      : "transparent",
                    color: stockItemData.materials.includes("N")
                      ? "white !important"
                      : "black",
                  }}
                  align="center"
                >
                  N
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: stockItemData.materials.includes("S")
                      ? "#f77b00 !important"
                      : "transparent",
                    color: stockItemData.materials.includes("S")
                      ? "white !important"
                      : "black",
                  }}
                  align="center"
                >
                  S
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: stockItemData.materials.includes("H")
                      ? "#bababa !important"
                      : "transparent",
                    color: stockItemData.materials.includes("H")
                      ? "white !important"
                      : "black",
                  }}
                  align="center"
                >
                  H
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                    component="h6"
                    align="center"
                  >
                    Stock
                  </Typography>
                </TableCell>
                <TableCell align="center" colSpan={7}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                    component="h6"
                    align="center"
                  >
                    {stockItemData.stockQty}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                    component="h6"
                    align="center"
                  >
                    Location
                  </Typography>
                </TableCell>
                <TableCell align="center" colSpan={7}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h5"
                    component="h5"
                    align="center"
                  >
                    {stockItemData.location}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className={styles.vendingQuantity}>
            <Typography
              padding="0 1em"
              variant="h4"
              component="h2"
              align="center"
            >
              {isTake ? "Take" : "Return"}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={decreaseNumber}
            >
              <HorizontalRule />
            </Button>

            <Typography
              padding="0 1em"
              variant="h4"
              component="h2"
              align="center"
            >
              {vendQty}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={increaseNumber}
            >
              <Add />
            </Button>
            <Typography
              padding="0 1em"
              variant="h4"
              component="h2"
              align="center"
            >
              {"Item(s)"}
            </Typography>
          </div>

          <div className={styles.vendingOptions}>
            <Button
              onClick={() => handleVending(vendQty, false)}
              fullWidth
              variant="contained"
              color="success"
              disabled={isTake}
            >
              Return
            </Button>
            <Switch
              className={styles.toggleSwitch}
              checked={isTake}
              onChange={handleToggleTakeorReturn}
            />
            <Button
              onClick={() => handleVending(vendQty, true)}
              fullWidth
              variant="contained"
              color="error"
              disabled={!isTake}
            >
              Take
            </Button>
          </div>
          <Typography
            mt={"1em"}
            color="error"
            variant="h4"
            component="h2"
            align="center"
          >
            {feedbackMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
