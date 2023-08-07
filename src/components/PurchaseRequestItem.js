import React from "react";
import { Typography, Grid } from "@mui/material/";

const PurchaseRequestItem = ({ itemData }) => {
  return (
    <>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        lg={3}
        sx={{
          borderRight: "1px solid black",
          borderBottom: "1px solid black",
          textAlign: "center",
        }}
      >
        <Typography variant="h7" component="h7">
          {itemData.requestBody}
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
          borderBottom: "1px solid black",
          textAlign: "center",
        }}
      >
        <Typography variant="h7" component="h7">
          {itemData.requester}
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
          borderBottom: "1px solid black",
          textAlign: "center",
        }}
      >
        <Typography variant="h7" component="h7">
          {itemData.requestDate}
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
          borderBottom: "1px solid black",
          textAlign: "center",
        }}
      >
        <Typography variant="h7" component="h7">
          {itemData.itemPurchased ? "Purchased" : "Not Yet Purchased"}
        </Typography>
      </Grid>
    </>
  );
};

export default PurchaseRequestItem;
