import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material/";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "40%",
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

export default function PurchaseRequestsManager({
  PurchaseRequestsManagerOpen,
}) {
  const [open, setOpen] = React.useState(PurchaseRequestsManagerOpen);
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
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}
          >
            MANAGE PURCHASE REQUESTS
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, border: "1px solid black", padding: "0 important" }}
          >
            <Grid item xs={10}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ border: "1px solid red", margin: "0" }}
              >
                Item Information
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                variant="standard"
                fullWidth
                sx={{ minWidth: 120, border: "1px solid red" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={10}>IN PROGRESS</MenuItem>
                  <MenuItem value={20}>COMPLETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ border: "1px solid red", margin: "0" }}
              >
                Item Information
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                variant="standard"
                fullWidth
                sx={{ minWidth: 120, border: "1px solid red" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={10}>IN PROGRESS</MenuItem>
                  <MenuItem value={20}>COMPLETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ border: "1px solid red", margin: "0" }}
              >
                Item Information
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                variant="standard"
                fullWidth
                sx={{ minWidth: 120, border: "1px solid red" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={10}>IN PROGRESS</MenuItem>
                  <MenuItem value={20}>COMPLETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ border: "1px solid red", margin: "0" }}
              >
                Item Information
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                variant="standard"
                fullWidth
                sx={{ minWidth: 120, border: "1px solid red" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={10}>IN PROGRESS</MenuItem>
                  <MenuItem value={20}>COMPLETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ border: "1px solid red", margin: "0" }}
              >
                Item Information
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                variant="standard"
                fullWidth
                sx={{ minWidth: 120, border: "1px solid red" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={10}>IN PROGRESS</MenuItem>
                  <MenuItem value={20}>COMPLETE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
