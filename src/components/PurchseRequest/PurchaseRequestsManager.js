import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button, Grid } from "@mui/material/";
import PurchaseRequest from "./PurchaseRequest";
import axios from "axios";
import PurchaseRequestItem from "./PurchaseRequestItem";
import PurchaseHistory from "./PurchaseHistory";
import { BASE_URL } from "../../constants/config";
import CloseWindow from "../UI/CloseWindow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  minHeight: "90vh",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

export default function PurchaseRequestsManager({ stockItems }) {
  const [open, setOpen] = useState(false);
  const [purchaseRequests, setPurchaseRequests] = useState([]);

  useEffect(() => {
    const fetchPurchaseRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/purchase-requests`);

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
      <Button variant="contained" align="center" onClick={handleOpen} fullWidth>
        Purchase Requests
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
          <div style={{ display: "flex", marginRight: "auto" }}>
            <PurchaseRequest
              stockItems={stockItems}
              setPurchaseRequests={setPurchaseRequests}
            />
            <PurchaseHistory />
          </div>
          <CloseWindow handleClose={handleClose} />

          <Grid container mt="1em">
            <Grid
              item
              xs={8}
              sm={5}
              md={5}
              lg={6}
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
              sm={2.5}
              md={2.5}
              lg={2}
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
              sm={2}
              md={2}
              lg={2}
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
              sm={2.5}
              md={2.5}
              lg={2}
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
              purchaseRequests.map(
                (item) => !item.itemPurchased && <PurchaseRequestItem key={item.id} itemData={item} />
              )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
