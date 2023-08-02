import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Grid } from "@mui/material/";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "5em",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default function PurchaseRequestsManager() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" align="center" onClick={handleOpen} fullWidth>
        MANAGE PUR. REQ.
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                PURCHASE REQUESTS
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              sx={{
                borderRight: "1px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
              }}
            >
              <Typography variant="h7" component="h7">
                {"Requested Item(s)"}
              </Typography>
            </Grid>

            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              sx={{
                borderRight: "1px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
              }}
            >
              <Typography variant="h7" component="h7">
                Requested By
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
