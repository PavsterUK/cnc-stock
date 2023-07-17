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
import EditExistingStockItem from "./UpdateStockItem";

const style = {
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

export default function StockItemModal({ stockItemData }) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [number, setNumber] = React.useState(1);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const decreaseNumber = () => {
    setNumber((prevNumber) => (prevNumber > 1 ? prevNumber - 1 : 1));
  };

  const increaseNumber = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const handleToggleTakeorReturn = () => {
    setChecked(!checked);
  };

  const handleTake = () => {
    setFeedbackMessage(`You took ${number} item(s).`);
    setTimeout(() => {
      handleClose();
      setFeedbackMessage(""); // Clear the feedback message after the modal is closed
    }, 2000); // Delay for 2 seconds (adjust as needed)
    // Additional logic for processing the "Take" action
  };

  const handleReturn = () => {
    setFeedbackMessage(`You returned ${number} item(s).`);
    setTimeout(() => {
      handleClose();
      setFeedbackMessage(""); // Clear the feedback message after the modal is closed
    }, 2000); // Delay for 2 seconds (adjust as needed)
    // Additional logic for processing the "Return" action
  };

  return (
    <div>
      <Button fullWidth variant="outlined" onClick={handleOpen}>
        {stockItemData.title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditExistingStockItem stockItemData={stockItemData} />
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
                  <Typography variant="h5" component="h5" align="center">
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
                    Soout an item sdfsdf sdfsd fsdfsdf sdf f sdf sdf
                    sdfsdfsdfsdsdfdf sdf sdfsdfsdfsdsdf Some basic description
                    about an item sdfsdfme basic description about an item
                    sdfsdf sdfsd fsdfsdf sdf f ssdfsd fsdfsdf sdf f sdf sdf
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h5" component="h5" align="center">
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
                  <Typography variant="h5" component="h5" align="center">
                    Stock
                  </Typography>
                </TableCell>
                <TableCell align="center" colSpan={7}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h5"
                    component="h5"
                    align="center"
                  >
                    8
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h5" component="h5" align="center">
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
                    135
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className={styles.vendingQuantity}>
            <Button
              variant="contained"
              fullWidth
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
              {number}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={increaseNumber}
            >
              <Add />
            </Button>
          </div>

          <div className={styles.vendingOptions}>
            <Button
              onClick={handleReturn}
              fullWidth
              variant="contained"
              color="success"
              disabled={checked}
            >
              Return
            </Button>
            <Switch
              className={styles.toggleSwitch}
              checked={checked}
              onChange={handleToggleTakeorReturn}
            />
            <Button
              onClick={handleTake}
              fullWidth
              variant="contained"
              color="error"
              disabled={!checked}
            >
              Take
            </Button>
          </div>
          <Typography variant="h4" component="h2" align="center">
            {feedbackMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
