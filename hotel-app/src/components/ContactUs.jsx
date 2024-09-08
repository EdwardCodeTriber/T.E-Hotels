import React, { useState } from "react";
import picture from "../assets/beach-back.jpg";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const ContactUs = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message from ${formData.email}: ${formData.message}`);
    // Ideally, you would send this to a backend server or email service
    setFormData({ email: "", message: "" });
  };

  return (
    <Box sx={{
        backgroundImage: `url(${picture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or inquiries, feel free to reach out to us.
      </Typography>
      <Typography variant="body2" paragraph>
        Email: contact@tehotels.com
      </Typography>
      <Typography variant="body2" paragraph>
        Phone: +27 (67) 759-7654
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </Box>
    </Container>
    </Box>
  );
};

export default ContactUs;
