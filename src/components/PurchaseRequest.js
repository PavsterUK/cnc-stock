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

const PurchaseRequest = () => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [lastWord, setLastWord] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendRequest = () => {
    handleClose();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setLastWord(getLastWordFromString(event.target.value));
  };

  const getLastWordFromString = (str) => {
    const words = str.trim().split(" ");
    return words[words.length - 1];
  };

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
                    PURCHASE REQUEST
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    id="outlined-multiline-static"
                    label="Enter item('s) information here"
                    multiline
                    rows={8}
                    sx={{ width: "100%" }}
                  />
                  {lastWord && <HintWordEndingInput word={lastWord} />}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button>Ok</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};

export default PurchaseRequest;
