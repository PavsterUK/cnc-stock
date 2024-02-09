import React from "react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import Button from "@mui/material/Button";

const CloseWindow = ({ handleClose }) => {
  return (
    <Button color="error" sx={{ position: "absolute", top: "0", right: "0" }} onClick={handleClose}>
      <CancelSharpIcon fontSize="large" />
    </Button>
  );
};

export default CloseWindow;
