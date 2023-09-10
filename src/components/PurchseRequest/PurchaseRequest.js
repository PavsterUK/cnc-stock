import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, TextField, Container } from "@mui/material/";
import HintWordEndingInput from "./HintWordEndingInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { DateTime } from "luxon";
import { BASE_URL } from "../../constants/config";
import CloseWindow from "../UI/CloseWindow";

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

export default function PurchaseRequest({ authenticatedUser, setPurchaseRequests, stockItems }) {
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
      <Button  variant="contained" align="center" onClick={handleOpen}>
        Request new item
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseWindow handleClose={handleClose} />

          <Typography variant="h5" component="h2" align="center" sx={{ fontWeight: "bold" }}>
            NEW PURCHASE REQUEST
          </Typography>

          <TextField
            value={requestBody}
            onChange={handleInputChange}
            id="outlined-multiline-static"
            label="Enter item('s) details here..."
            multiline
            rows={8}
            sx={{ width: "100%" }}
          />
          <ConfirmationDialog closeParent={handleClose} handleSendRequest={handleSendRequest} />
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
    <Container mt="1em" >
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
            You request has been successfully submitted. You can now put your feet up and relax.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cheers mate!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
