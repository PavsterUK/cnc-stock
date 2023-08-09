import React from "react";
import { Typography, Grid, Select, MenuItem } from "@mui/material/";
import axios from "axios";

const PurchaseRequestItem = ({ itemData }) => {
  const [itemPurchaseStatus, setItemPurchaseStatus] = React.useState(
    itemData.itemPurchased ? "Done" : "In Progress"
  );
  const backgroundColor = itemPurchaseStatus === "Done" ? "#77DD76" : "#FFB6B3";

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setItemPurchaseStatus(value);
    switch (value) {
      case "Done":
        updatePurchaseRequest(value);
        break;
      case "In Progress":
        updatePurchaseRequest(value);
        break;
      case "Cancel":
        deletePurchaseRequest();
        break;
      default:
        break;
    }
  };

  const deletePurchaseRequest = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/purchase-request/${itemData.id}`
      );
      //Succes logic
    } catch (error) {
      // Handle error if the request fails
      console.error("Error deleting purchase request", error);
    }
  };

  const updatePurchaseRequest = async (value) => {
    const isItemPurchased = value === "Done";

    try {
      await axios.put(
        `http://localhost:8080/api/purchase-request/${itemData.id}`,
        {
          ...itemData, // Existing purchase request data
          itemPurchased: isItemPurchased, // Updated property
        }
      );

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
        sm={8}
        md={8}
        lg={8}
        sx={{
          borderLeft: "1px solid black",
          borderBottom: "1px solid black",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important",
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
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important",
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
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important",
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
          borderBottom: "1px solid black",
          textAlign: "center",
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 .5em !important",
        }}
      >
        <Select
          value={itemPurchaseStatus}
          onChange={(event) => handleSelectChange(event)}
          sx={{
            backgroundColor: "lightgray",
          }}
        >
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Cancel">Cancel</MenuItem>
        </Select>
      </Grid>
    </>
  );
};

export default PurchaseRequestItem;
