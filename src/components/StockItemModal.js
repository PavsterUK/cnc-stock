import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import styles from "./StockItemModal.module.css";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "25rem",
  maxWidth: "30rem",
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          ></Typography>
          <table className={styles}>
            <tr>
              <th colspan="8">{stockItemData.title}</th>
            </tr>

            <tr>
              <th>Description</th>
              <td colspan="7">
                Some basic descriptions aboit an item sdfsdfsdf sdfsdfsdfs
                sdfsdfsdf sdfsdfsd sdfsdfsdf sdfsdfsd sdfsfd
              </td>
            </tr>
            <tr>
              <th>Suitable Materials</th>
              <td>P</td>
              <td>M</td>
              <td>K</td>
              <td>N</td>
              <td>S</td>
              <td>H</td>
              <td>O</td>
            </tr>
            <tr>
              <th>Currently In Stock</th>
              <td colspan="7">8</td>
            </tr>
          </table>

          <div className={styles.vendingQuantity}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={decreaseNumber}
            >
              <ArrowLeft />
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
              <ArrowRight />
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
          <Typography
              
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
