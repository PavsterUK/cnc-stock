import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginErrorModal from "./LoginErrorModal";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      "RotaVal Stock Monitor" {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const users = [
  { name: "Pavel Naumovic", rotavalId: 107, password: 1234 },
  { name: "Bob Smith", rotavalId: 108, password: 1234 },
  { name: "Pamela Anderson", rotavalId: 109, password: 1234 },
];

export default function SignIn({ setIsLoggedIn, setAuthenticatedUser }) {
  const [isLoginError, setIsLoginError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredId = data.get("id");
    const enteredPassword = data.get("password");

    const user = users.find(
      (user) =>
        user.rotavalId === parseInt(enteredId) &&
        user.password === parseInt(enteredPassword)
    );

    if (user) {
      setIsLoggedIn(true);
      setAuthenticatedUser(user.name);
    } else {
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            RotaVal Stock Monitor
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="RotaVal ID"
              name="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
