import React from "react";
import { Typography, Grid, Select, MenuItem } from "@mui/material/";
import axios from "axios";
import { DateTime } from "luxon";
import BASE_URL from "./baseURL";

const PurchaseRequestItem = ({ itemData }) => {
  const [itemPurchaseStatus, setItemPurchaseStatus] = React.useState(
    itemData.itemPurchased ? "Done" : "In Progress"
  );
  const backgroundColor = itemPurchaseStatus === "Done" ? "#77DD76" : "#FFB6B3";
  const formattedTime = DateTime.fromISO(itemData.requestDate).toFormat(
    "MMMM d, yyyy"
  );

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setItemPurchaseStatus(value);
    value === "Cancel" ? deletePurchaseRequest() : updatePurchaseRequest(value);
  };

  const deletePurchaseRequest = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/purchase-request/${itemData.id}`);
      //Succes logic
    } catch (error) {
      // Handle error if the request fails
      console.error("Error deleting purchase request", error);
    }
  };

  const updatePurchaseRequest = async (value) => {
    const isItemPurchased = value === "Done";

    try {
      await axios.put(`${BASE_URL}/api/purchase-request/${itemData.id}`, {
        ...itemData, // Existing purchase request data
        itemPurchased: isItemPurchased, // Updated property
      });

      // Success logic
    } catch (error) {
      // Handle error if the request fails
      console.error("Error updating purchase request", error);
    }
  };

  return (
    <>
      <Grid
        item
        xs={8}
        sm={5}
        md={5}
        lg={6}
        sx={{
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: ".5em !important",
          marginTop: ".3em",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}
      >
        <Typography variant="h6" component="h6">
          {itemData.requestBody}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1.5}
        sm={2.5}
        md={2.5}
        lg={2}
        sx={{
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: ".5em !important",
          marginTop: ".3em",
        }}
      >
        <Typography variant="h6" component="h6">
          {itemData.requester.split("-")[1].trim()}
        </Typography>
      </Grid>

      <Grid
        item
        xs={1}
        sm={2}
        md={2}
        lg={2}
        sx={{
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: ".5em !important",
          marginTop: ".3em",
        }}
      >
        <Typography variant="h6" component="h6">
          {formattedTime}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1.5}
        sm={2.5}
        md={2.5}
        lg={2}
        sx={{
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: ".5em !important",
          marginTop: ".3em",
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      >
        <Select
          value={itemPurchaseStatus}
          onChange={(event) => handleSelectChange(event)}
          sx={{
            backgroundColor: "lightgray",
          }}
        >
          <MenuItem value="Done">Purchased</MenuItem>
          <MenuItem value="In Progress">Not Purchased</MenuItem>
          <MenuItem value="Cancel">Cancel</MenuItem>
        </Select>
      </Grid>
    </>
  );
};

export default PurchaseRequestItem;
