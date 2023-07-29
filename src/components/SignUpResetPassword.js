import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function SignUpResetPassword({ isSignUp }) {
  const [open, setOpen] = React.useState(false);
  const [rotavalID, setRotavalID] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [adminCode, setAdminCode] = React.useState("");
  const [error, setError] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRotavalID("");
    setName("");
    setSurname("");
    setPassword("");
    setRepeatPassword("");
    setAdminCode("");
    setError("");
  };

  const handleSignUp = () => {
    if (!rotavalID || !password || !repeatPassword) {
      setError("All fields are required.");
    } else if (password !== repeatPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");

      if (isSignUp) {
        // For Sign Up - Create a new user
        axios
          .post("/api/users/add", {
            rotavalID,
            name,
            surname,
            password,
          })
          .then((response) => {
            // Handle the successful sign-up response
            handleClose();
          })
          .catch((error) => {
            // Handle sign-up error
            console.error("Sign Up Error:", error);
            if (error.response && error.response.data) {
              setError(error.response.data);
            } else {
              setError("Error occurred during sign up.");
            }
          });
      } else {
        // For Reset Password - Update password if the user exists
        axios
          .put(
            `/api/users/updatePassword/${rotavalID}?adminCode=${adminCode}`,
            password
          )
          .then((response) => {
            // Handle the successful password update response
            handleClose();
          })
          .catch((error) => {
            // Handle password update error

            if (error.response && error.response.data) {
              setError(error.response.data);
            } else {
              setError("Error occurred during password update.");
            }
          });
      }
    }
  };

  return (
    <div>
      <Link onClick={handleOpen} href="#" variant="body2">
        {isSignUp ? "Don't have an account? Sign Up" : "Reset Password"}
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h1 id="parent-modal-title">
            {isSignUp ? "Sign Up" : "Reset Password"}
          </h1>

          {isSignUp && (
            <>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </>
          )}
          <TextField
            label="Rotaval ID"
            value={rotavalID}
            onChange={(e) => setRotavalID(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password (*short and easy will be ok)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          {!isSignUp && (
            <TextField
              label="Admin Code"
              value={adminCode}
              type="password"
              onChange={(e) => setAdminCode(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          )}
          <p style={{ color: "red" }}>{error}</p>
          <Button fullWidth variant="contained" onClick={handleSignUp}>
            {isSignUp ? "Sign Up" : "Reset Password"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
