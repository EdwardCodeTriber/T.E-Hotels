import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import picture from "../assets/beach-back.jpg";
import aboutImg1 from "../assets/outdoor-2.jpg";  
import aboutImg2 from "../assets/outdoor-dash.jpg";

const AboutUs = () => {
  return (
    <Box sx={{
        backgroundImage: `url(${picture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        At T.E. Hotels, we pride ourselves on providing exceptional hospitality and luxurious accommodations. 
        Our hotels are located in prime locations, offering unparalleled comfort and elegance. Our team is 
        dedicated to ensuring your stay is unforgettable, with a commitment to personalized service.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Box>
            <img src={aboutImg1} alt="Hotel Image 1" style={{ width: "100%" }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <img src={aboutImg2} alt="Hotel Image 2" style={{ width: "100%" }} />
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body1" paragraph sx={{ mt: 4 }}>
        Whether you're here for business or leisure, we offer a variety of rooms and suites to meet your needs. 
        From the moment you walk through our doors, you will experience a warm welcome, luxurious amenities, 
        and a home away from home. We look forward to hosting you at one of our premier locations worldwide.
      </Typography>
    </Container>
    </Box>
  );
};

export default AboutUs;
