import React from 'react'
import { Container, Box, AppBar, Toolbar, Typography, Button, IconButton, TextField, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import picture from '../assets/outdoor-2.jpg';
import picture1 from '../assets/room-1.jpg';
import picture2 from '../assets/room-4.jpg';
import picture3 from '../assets/view-room-6.jpg';
import picture5 from '../assets/room-5.jpg';

const Home = () => {
  return (
    <div>
        <Box sx={{
            backgroundImage: `url(${picture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
        }}>
        <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            T.E. Hotels
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Contact Us</Button>
          <Button color="inherit">About Us</Button>
          <IconButton color="inherit">
            <FavoriteIcon />
          </IconButton>
          <IconButton color="inherit">
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box textAlign="center" sx={{ mb: 4 }}>
          <TextField 
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <SearchIcon />
              ),
            }}
          />
        </Box>

        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h4">Book a beautiful room to live in</Typography>
          <Typography variant="h6">Find a source you want to spend time in</Typography>
        </Box>
        <Container sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            
        </Container>
        <Grid container spacing={4}>
          {roomData.map((room) => (
            <Grid item xs={12} md={6} lg={4} key={room.title}>
              <Card sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:"white"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={room.image}
                  alt={room.title}
                />
                <CardContent>
                  <Typography variant="h6">{room.title}</Typography>
                  {/* Replace with rating component */}
                  <Typography>⭐⭐</Typography>
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent:"flex-end"}}>
                  <Button size="small" variant="contained" color="primary">Book</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
        </Box>
         
    </div>
  )
}
const roomData = [
    {
      title: 'Closed View Room',
      image: `${picture1}`, 
    },
    {
      title: 'Outside View Room',
      image: `${picture2}`,
    },
    {
      title: 'Top Garden Room',
      image: `${picture5}`,
    },
    {
      title: 'Full 180° View Room',
      image: `${picture3}`,
    },
  ];
export default Home