import * as React from "react";
import Modal from "@mui/material/Modal";
import ItemSelectAutocomplete from "./ItemSelectAutocomplete";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material/";

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

export default function PurchaseRequest({ purchaseRequestOpen }) {
  const [open, setOpen] = React.useState(purchaseRequestOpen);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" align="center" onClick={handleOpen} fullWidth>
        Purchase Request
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
                    Purchase Request
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <ItemSelectAutocomplete />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
}
