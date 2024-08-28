import React from 'react'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import { Box, Typography, Button, Container } from '@mui/material';
import picture from '../assets/dashboard-back.jpg'

const Landing = () => {
    const navigate = useNavigate();
    const toLogin =(()=>{
        navigate('/LogIn')
    })
  return (
    <div style={{backgroundImage: `url(${picture})`}}>
       <Box
      sx={{
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'Black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Centered Logo Section */}
      <Box
        sx={{
          position: 'absolute',
          top: '20px',  
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <img src="/Logo.png" alt="Logo" style={{ width: '100px', borderRadius:"50%" }} />
      </Box>

      {/* Main Content */}
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            "Stay Simple, Book Easy."
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={toLogin}>
            Sign In
          </Button>
          <Button variant="contained" color="secondary">
            View Rooms
          </Button>
        </Box>
        <Typography variant="body1" sx={{ mt: 4 }}>
          Discover a haven of comfort and elegance at our hotel, where every detail is designed
          to make your stay unforgettable. Nestled in the heart of the city, our hotel offers
          luxurious rooms, world-class amenities, and exceptional service that cater to both
          leisure and business travelers. Whether you're here for a relaxing getaway or a
          productive business trip, our stunning rooftop views, gourmet dining options, and
          serene spa will elevate your experience. Book with us and experience the perfect
          blend of style, comfort, and convenience. Your ideal stay is just a click away.
        </Typography>
      </Container>
    </Box>
    </div>
  )
}

export default Landing