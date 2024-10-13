import React, { useEffect, useState } from 'react';
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
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Carousel from 'react-material-ui-carousel';

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const loading = useSelector((state) => state.accommodations.loading);
  const error = useSelector((state) => state.accommodations.error);

  const [favorites, setFavorites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleFavoriteToggle = (accommodationId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(accommodationId)
        ? prevFavorites.filter((id) => id !== accommodationId)
        : [...prevFavorites, accommodationId]
    );
  };

  const handleShare = (accommodationName) => {
    navigator.clipboard.writeText(`Check out this accommodation: ${accommodationName}`);
    alert(`Shared: ${accommodationName}`);
  };

  const handleCardClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAccommodation(null);
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
    <>
      <Grid container spacing={3} padding={2}>
        {accommodations.map((accommodation) => (
          <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
            <Card onClick={() => handleCardClick(accommodation)} style={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                alt={accommodation.name}
                height="200"
                image={accommodation.photos[0]} // Show first image as a preview
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {accommodation.name}
                </Typography>
                <Typography color="text.secondary">Price: R {accommodation.price}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {accommodation.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {accommodation.rating} ★
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the card click from triggering
                      handleFavoriteToggle(accommodation.id);
                    }}
                    color={favorites.includes(accommodation.id) ? 'secondary' : 'default'}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(accommodation.name);
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Detailed View */}
      {selectedAccommodation && (
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
          <DialogContent>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedAccommodation.name}
            </Typography>

            {/* Slideshow for photos */}
            <Carousel autoPlay={false} navButtonsAlwaysVisible>
              {selectedAccommodation.photos.map((photo, index) => (
                <Box key={index} sx={{ height: 300, overflow: 'hidden' }}>
                  <img
                    src={photo}
                    alt={`${selectedAccommodation.name} ${index}`}
                    style={{ width: '100%', objectFit: 'cover', height: '100%' }}
                  />
                </Box>
              ))}
            </Carousel>

            <Typography variant="body1" color="text.secondary" mt={2}>
              Price: R {selectedAccommodation.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {selectedAccommodation.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {selectedAccommodation.rating} ★
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amenities: {selectedAccommodation.amenities.join(", ")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={() => alert('Booking functionality here')}>
              Book
            </Button>
            <Button onClick={handleDialogClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AccommodationList;
