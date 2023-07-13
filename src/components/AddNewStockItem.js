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
} from "@mui/material/";
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

export default function AddNewStockItem({ AddNewStockItemOpenOpen }) {
  const [open, setOpen] = React.useState(AddNewStockItemOpenOpen);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                    Purchase Request
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    id="outlined-multiline-static"
                    label="Item('s) to be purchased."
                    multiline
                    rows={8}
                    sx={{ width: "100%" }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <AlertDialog
                    onClick={handleSendRequest}
                    name={"Send Request"}
                    handleCloseParent={handleClose}
                    dialogTitle={"Purchase Request Accepted!"}
                    dialogMessage={"Your request has been accepted and will be reviewed by the responsible person. Thank you!"}
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