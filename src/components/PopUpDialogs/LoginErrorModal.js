import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const LoginErrorModal = ({ open, onClose }) => {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="login-error-modal-title"
      aria-describedby="login-error-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" id="login-error-modal-title" gutterBottom>
          Incorrect Credentials
        </Typography>
        <Typography
          variant="body1"
          id="login-error-modal-description"
          gutterBottom
        >
          Please enter the correct RotaVal ID and password.
        </Typography>
        <Button onClick={handleModalClose} variant="contained" color="primary">
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginErrorModal;
