import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Grid } from "@mui/material/";
import PurchaseRequest from "./PurchaseRequest";
import axios from "axios";
import PurchaseRequestItem from "./PurchaseRequestItem";
import PurchaseHistory from "./PurchaseHistory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  minHeight: "90vh",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

export default function PurchaseRequestsManager({
  authenticatedUser,
  stockItems,
}) {
  const [open, setOpen] = React.useState(false);
  const [purchaseRequests, setPurchaseRequests] = React.useState([]);

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
  }, [open]);

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
          <PurchaseHistory />

          <PurchaseRequest
            stockItems={stockItems}
            setPurchaseRequests={setPurchaseRequests}
            authenticatedUser={authenticatedUser}
          />

          <Grid container mt="3em">
            <Grid
              item
              xs={8}
              sm={8}
              md={8}
              lg={8}
              sx={{
                fontWeight: "bold",
                borderRight: "3px solid black",
                borderLeft: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
                padding: "0 .5em !important",
              }}
            >
              <Typography variant="h6" component="h6">
                {"Requested Item(s)"}
              </Typography>
            </Grid>

            <Grid
              item
              xs={1.5}
              sm={1.5}
              md={1.5}
              lg={1.5}
              sx={{
                fontWeight: "bold",
                borderRight: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
                padding: "0 .5em !important",
              }}
            >
              <Typography variant="h6" component="h6">
                Requested By
              </Typography>
            </Grid>

            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              lg={1}
              sx={{
                fontWeight: "bold",
                borderRight: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
                padding: "0 .5em !important",
              }}
            >
              <Typography variant="h6" component="h6">
                Date
              </Typography>
            </Grid>
            <Grid
              item
              xs={1.5}
              sm={1.5}
              md={1.5}
              lg={1.5}
              sx={{
                fontWeight: "bold",
                borderRight: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "center",
                padding: "0 .5em !important",
              }}
            >
              <Typography variant="h6" component="h6">
                Status
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ overflow: "auto" }}>
            {purchaseRequests &&
              purchaseRequests.map((item) => (
                !item.itemPurchased && <PurchaseRequestItem key={item.id} itemData={item} />
              ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
