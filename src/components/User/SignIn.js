import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GerickeLogo from "../../images/GerickeLogo";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import BASE_URL from "../baseURL";
import LoginErrorModal from "../PopUpDialogs/LoginErrorModal";
import SignUpResetPassword from "./SignUpResetPassword";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      "Gericke RotaVal" {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn({ setIsLoggedIn, setAuthenticatedUser }) {
  const [isLoginError, setIsLoginError] = useState(false);
  const rotavalIDRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    // Function to handle pressing the Enter key
    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };

    // Add the event listener for "keydown" on the form
    document.addEventListener("keydown", handleEnterKey);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rotavalId", rotavalIDRef.current.value);
    formData.append("password", passwordRef.current.value);

    try {
      const response = await axios.post(`${BASE_URL}/api/signin`, formData);

      setIsLoggedIn(true);
      setAuthenticatedUser(
        `Employee: ${rotavalIDRef.current.value} - ${response.data}`
      );
    } catch (error) {
      console.error("Sign-in error:", error);
      setIsLoginError(true);
    }
  };

  const handleModalClose = () => {
    setIsLoginError(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <LoginErrorModal open={isLoginError} onClose={handleModalClose} />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GerickeLogo sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Box sx={{ mt: 1 }}>
            <TextField
              name="rotavalID"
              inputRef={rotavalIDRef}
              margin="normal"
              required
              fullWidth
              label="RotaVal ID"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              inputRef={passwordRef}
              label="Password"
              type="password"
              id="password"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <SignUpResetPassword />
              </Grid>
              <Grid item>
                <SignUpResetPassword isSignUp />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
