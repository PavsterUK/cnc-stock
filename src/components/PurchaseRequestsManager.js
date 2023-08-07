import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Grid } from "@mui/material/";
import PurchaseRequest from "./PurchaseRequest";
import axios from "axios";
import PurchaseRequestItem from "./PurchaseRequestItem";

const style = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  minHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default function PurchaseRequestsManager({ authenticatedUser }) {
  const [open, setOpen] = React.useState(false);
  const [purchaseRequests, setPurchaseRequests] = React.useState();

  React.useEffect(() => {
    const fetchPurchaseRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/purchase-requests"
        );
        setPurchaseRequests(response.data);
      } catch (error) {
        // Handle error if the request fails
        console.error("Error fetching purchase request list:", error);
      }
    };

    fetchPurchaseRequests();
  }, []);

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
            <Grid item>
              <PurchaseRequest authenticatedUser={authenticatedUser} />
            </Grid>
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
                fontWeight: "bold",
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
                fontWeight: "bold",
                borderRight: "1px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
              }}
            >
              <Typography variant="h7" component="h7">
                Requested By
              </Typography>
            </Grid>

            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              sx={{
                fontWeight: "bold",
                borderRight: "1px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
              }}
            >
              <Typography variant="h7" component="h7">
                Request Date
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              sx={{
                fontWeight: "bold",
                borderRight: "1px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
              }}
            >
              <Typography variant="h7" component="h7">
                Status
              </Typography>
            </Grid>
            {purchaseRequests.map((item) => (
              <PurchaseRequestItem itemData={item} />
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
