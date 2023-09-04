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
import HintWordEndingInput from "./HintWordEndingInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { DateTime } from "luxon";
import { BASE_URL } from "../../constants/config";

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

export default function PurchaseRequest({
  authenticatedUser,
  setPurchaseRequests,
  stockItems,
}) {
  const [open, setOpen] = React.useState(false);
  const [requestBody, setRequestBody] = React.useState("");
  const [lastWord, setLastWord] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    setRequestBody(event.target.value);
    setLastWord(getLastWordFromString(event.target.value));
  };

  const getLastWordFromString = (str) => {
    const words = str.trim().split(" ");
    return words[words.length - 1];
  };

  const handleSendRequest = () => {
    const now = DateTime.local();
    //Format for backend
    const formattedDate = now.toFormat("yyyy-MM-dd");

    const purReq = {
      requestDate: formattedDate,
      requestBody: requestBody,
      requester: authenticatedUser,
      isComplete: false,
    };

    axios
      .post(`${BASE_URL}/api/purchase-request`, purReq)
      .then((response) => {
        console.log("New Purchase Request created:", response.data);
        setPurchaseRequests((prevData) => [...prevData, response.data]);
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating Purchase Request: ", error);
      });
  };

  return (
    <>
      <Button
        sx={{ position: "absolute", left: 10, top: 10 }}
        variant="contained"
        align="center"
        onClick={handleOpen}
      >
        Request new item
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    NEW PURCHASE REQUEST
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    value={requestBody}
                    onChange={handleInputChange}
                    id="outlined-multiline-static"
                    label="Enter item('s) details here..."
                    multiline
                    rows={8}
                    sx={{ width: "100%" }}
                  />
                  {lastWord && (
                    <HintWordEndingInput
                      word={lastWord}
                      stockItems={stockItems}
                    />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <ConfirmationDialog
                    closeParent={handleClose}
                    handleSendRequest={handleSendRequest}
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

function ConfirmationDialog({ closeParent, handleSendRequest }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleSendRequest();
    setOpen(false);
    closeParent();
  };

  return (
    <div>
      <Button fullWidth variant="contained" onClick={handleClickOpen}>
        SEND REQUEST
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Request Sent!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You request has been successfully submitted. You can now put your
            feet up and relax.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cheers mate!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}