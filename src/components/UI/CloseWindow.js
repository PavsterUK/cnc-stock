import React from "react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import Button from "@mui/material/Button";

// sx={{ position: "absolute", top: "0", right: "0", margin: 0, padding: 0 }}

const CloseWindow = ({ handleClose }) => {
  return (
    <Button color="error"  onClick={handleClose}>
      <CancelSharpIcon fontSize="large" />
    </Button>
  );
};

export default CloseWindow;
