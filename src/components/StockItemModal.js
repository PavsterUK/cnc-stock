import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <td colspan="7">Some basic descriptions aboit an item  sdfsdfsdf sdfsdfsdfs sdfsdfsdf sdfsdfsd  sdfsdfsdf  sdfsdfsd  sdfsfd</td>
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
        </Box>
      </Modal>
    </div>
  );
}
