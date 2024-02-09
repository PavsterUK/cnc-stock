import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Grid } from "@mui/material";
import { BASE_URL } from "../../constants/config";
import CloseWindow from "../UI/CloseWindow";

const style = {
  position: "absolute",
  top: "50%",
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
  flexDirection: "column",
};

const PurchaseHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [purchaseRequests, setPurchaseRequests] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
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
  }, []);

  return (
    <div>
      <Button color="success" sx={{}} onClick={handleOpen}>
        Purchase History
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseWindow handleClose={handleClose} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography textAlign="center" id="modal-modal-title" variant="h4" component="h4">
                Purchase History
              </Typography>
            </Grid>
            {purchaseRequests &&
              [...purchaseRequests].reverse().map((item, index) => (
                <React.Fragment key={item.id}>
                  <Grid
                    item
                    xs={9.5}
                    sm={9.5}
                    md={9.5}
                    lg={9.5}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "lightgray" : "white", // Alternating background color
                      // ...other styles
                    }}
                  >
                    <Typography variant="h6" component="h6">
                      {item.requestBody}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1.5}
                    sm={1.5}
                    md={1.5}
                    lg={1.5}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "lightgray" : "white", // Alternating background color
                      // ...other styles
                    }}
                  >
                    <Typography variant="h6" component="h6">
                      {item.requester.split("-")[1].trim()}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "lightgray" : "white", // Alternating background color
                      // ...other styles
                    }}
                  >
                    <Typography variant="h6" component="h6">
                      {item.requestDate}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PurchaseHistory;
