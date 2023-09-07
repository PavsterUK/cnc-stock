import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteConfirmDialog({ itemTitle, handleDeleteItem, handleCloseParent }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseParent();
  };

  const handleDeleteConfirmed = () => {
    handleDeleteItem();
    handleClose();
  };

  return (
    <div>
      <Button fullWidth onClick={handleClickOpen} variant="contained" color="error">
        Delete Item
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Permanently Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want permanently delete {itemTitle}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed}>Fuck Yeah!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
