import React from "react";
import { Typography, Grid, Select, MenuItem } from "@mui/material/";

const PurchaseRequestItem = ({ itemData }) => {
  const [itemPurchaseStatus, setItemPurchaseStatus] = React.useState(
    itemData.itemPurchased ? "Done" : "In Progress"
  );

  const backgroundColor = itemPurchaseStatus === "Done" ? "#77DD76" : "#FFB6B3";

  return (
    <>
      <Grid
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
        sx={{
          borderRight: "1px solid black",
          borderLeft: "1px solid black",
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important"
        }}
      >
        <Typography variant="h6" component="h6">
          {itemData.requestBody}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1.5}
        sm={1.5}
        md={1.5}
        lg={1.5}
        sx={{
          borderRight: "1px solid black",
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important"
        }}
      >
        <Typography variant="h6" component="h6">
          {itemData.requester.split("-")[1].trim()}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
        sx={{
          borderRight: "1px solid black",
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important"
        }}
      >
        <Typography variant="h6" component="h6">
          {itemData.requestDate}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1.5}
        sm={1.5}
        md={1.5}
        lg={1.5}
        sx={{
          borderRight: "1px solid black",
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important"
        }}
      >
        <Select
          value={itemPurchaseStatus}
          onChange={(event) => {
            const value = event.target.value;
            setItemPurchaseStatus(value);
          }}
          sx={{
            backgroundColor: "lightgray",
          }}
        >
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </Grid>
    </>
  );
};

export default PurchaseRequestItem;
