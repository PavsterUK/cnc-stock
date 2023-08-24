import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StockItemStats({ stockItemId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vendTransactions, setVendTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchVendTransactions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/by-stock-item/${stockItemId}`
        );
        setVendTransactions(response.data);
      } catch (error) {
        console.error("Error fetching vending transactions:", error);
      }
    };
    fetchVendTransactions();
  });

  return (
    <div>
      <Button onClick={handleOpen}>Item Stats</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </div>
  );
}
