import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import CategorySelector from "./CategorySelector";

const stockItems = [
  {
    title: "CNMG120408-WPP20S",
    location: "0",
    description: "turning insert",
    category: "turning",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            CNC Inventory
          </Typography>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* Search Bar  */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Look For Items
        </Typography>

        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ display: "flex" }}
        >
          <CategorySelector />
          <TextField
            id="outlined-basic"
            label="Item desription"
            variant="outlined"
          />
        </Container>
      </Container>
      {/* End search bar */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {stockItems.map((stockItem) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={stockItem.title} xs={12}>
              <Card>
                <CardHeader
                  title={stockItem.title}
                  subheader={stockItem.subheader}
                  titleTypographyProps={{ align: "left" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                {/* <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="text.secondary"
                    ></Typography>
                  </Box>
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={stockItem.description}
                    >
                      {stockItem.description}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    Withdraw Stock
                  </Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
