import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

export default function DeleteConfirmDialog({ itemTitle, handleDeleteItem }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteItem();
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{ position: "absolute", top: 5, right: 5 }}
        variant="contained"
        color="error"
      >
        <DeleteForeverTwoToneIcon fontSize="large" />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Permanently Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want permanently delete {itemTitle}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed}>Fuck Yeah!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
