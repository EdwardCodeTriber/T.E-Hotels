import React, { useEffect, useState } from 'react'; // Import useState for managing favorites
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../Redux/accommodationSlice'; 
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Alert,
  CardMedia, // Import CardMedia for images
  IconButton, // Import IconButton for buttons
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import Favorite icon
import ShareIcon from '@mui/icons-material/Share'; // Import Share icon

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const loading = useSelector((state) => state.accommodations.loading);
  const error = useSelector((state) => state.accommodations.error);
  
  const [favorites, setFavorites] = useState([]); // State for storing favorite accommodations

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleFavoriteToggle = (accommodationId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(accommodationId)) {
        return prevFavorites.filter((id) => id !== accommodationId); // Remove from favorites
      } else {
        return [...prevFavorites, accommodationId]; // Add to favorites
      }
    });
  };

  const handleShare = (accommodationName) => {
    // Here you can implement sharing logic, copying to clipboard
    navigator.clipboard.writeText(`Check out this accommodation: ${accommodationName}`);
    // Simple alert for demonstration
    alert(`Shared: ${accommodationName}`); 
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} padding={2}>
      {accommodations.map((accommodation) => (
        <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
          <Card>
            {/* Adding CardMedia for the accommodation image */}
            <CardMedia
              component="img"
              alt={accommodation.name}
              height="200" 
              image={accommodation.photos} 
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {accommodation.name}
              </Typography>
              <Typography color="text.secondary">
                Price: R {accommodation.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {accommodation.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {accommodation.rating} ★
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amenities: {accommodation.amenities.join(", ")}
              </Typography>

              {/* Action buttons for favorites and sharing */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <IconButton 
                  onClick={() => handleFavoriteToggle(accommodation.id)} 
                  color={favorites.includes(accommodation.id) ? "secondary" : "default"} // Change color based on favorite status
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton onClick={() => handleShare(accommodation.name)}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AccommodationList;
