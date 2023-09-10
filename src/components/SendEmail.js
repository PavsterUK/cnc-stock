import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { BASE_URL } from "../constants/config";
import axios from "axios";

function SendEmail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = async (to, subject, text) => {
    try {
      const response = await axios.post(`${BASE_URL}/sendEmail`, null, {
        params: { to, subject, text },
      });

      if (response.status === 200) {
        setMessage("Email sent successfully!");
      } else {
        setMessage("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Error sending email");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Send Email
      </Typography>
      <form>
        <TextField
          fullWidth
          label="To"
          variant="outlined"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Text"
          variant="outlined"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={() => handleSendEmail(to, subject, text)} fullWidth>
          Send Email
        </Button>
      </form>
      <Typography variant="body1" align="center" color="textSecondary">
        {message}
      </Typography>
    </Container>
  );
}

export default SendEmail;
