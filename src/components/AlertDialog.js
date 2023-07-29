import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  name,
  handleCloseParent,
  handleSendRequest,
  dialogTitle,
  dialogMessage,
  areAllFieldsFilled,
  backEndError
}) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (areAllFieldsFilled()) {
      handleSendRequest();
      handleCloseParent();
    }
  };

  const handleSendRequestWithValidation = () => {
    handleOpen();
    if (areAllFieldsFilled() && backEndError !== "") {
      handleSendRequest();
      handleCloseParent();
    } else if (areAllFieldsFilled()) {
      setErrorMessage("Please fill all required fields");
    } else {
      setErrorMessage({backEndError});
    }
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSendRequestWithValidation}
      >
        {name}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {areAllFieldsFilled() && !errorMessage ? dialogTitle : "Error!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {areAllFieldsFilled()
              ? dialogMessage
              : errorMessage || "Please fill all required fields"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
