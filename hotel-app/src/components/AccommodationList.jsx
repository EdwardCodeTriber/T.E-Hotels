import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../Redux/accommodationSlice';
import { createReservation } from '../Redux/reservationSlice'; 
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
  TextField,
  Snackbar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Carousel from 'react-material-ui-carousel';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Px59aJPbpXk7YOzwZFEmqEENYeYAO4o0NQRX3CJbIee2TGOTUMQTw0KlswD4swqvkHSvJSsG9lc0DrRM5yMGBaU00o9vhiAem');

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const loading = useSelector((state) => state.accommodations.loading);
  const error = useSelector((state) => state.accommodations.error);
  const user = useSelector((state) => state.auth.user); // Assuming auth state
  const bookingLoading = useSelector((state) => state.bookings.loading);
  const bookingError = useSelector((state) => state.bookings.error);

  const [favorites, setFavorites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

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
    setCheckIn('');
    setCheckOut('');
    setTotalPrice(0);
    setPaymentSuccess(false);
    setPaymentError('');
  };

  const calculateTotalPrice = () => {
    if (checkIn && checkOut && selectedAccommodation) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const differenceInTime = checkOutDate - checkInDate;
      const differenceInDays = differenceInTime / (1000 * 3600 * 24); 

      if (differenceInDays > 0) {
        const totalCost = differenceInDays * selectedAccommodation.price;
        setTotalPrice(totalCost);
      } else {
        alert('Check-out date must be after check-in date');
      }
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [checkIn, checkOut, selectedAccommodation]);

  const handleBooking = async () => {
    if (!user) {
      setPaymentError('Please login to make a booking');
      return;
    }

    if (checkIn && checkOut && totalPrice > 0) {
      setPaymentLoading(true);
      
      try {
        const stripe = await stripePromise;
        
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2025,
            cvc: '123',
          },
          billing_details: {
            name: user.displayName || 'Test User',
            email: user.email || 'test@example.com',
          },
        });

        if (paymentMethodError) {
          throw new Error(paymentMethodError.message);
        }

        const bookingData = {
          userId: user.uid,
          accommodationId: selectedAccommodation.id,
          accommodationName: selectedAccommodation.name,
          checkIn,
          checkOut,
          totalPrice,
          paymentMethodId: paymentMethod.id,
          status: 'confirmed',
          location: selectedAccommodation.location,
          guests: 1,
          paymentStatus: 'completed',
          photoUrl: selectedAccommodation.photos[0]
        };

        await dispatch(createReservation(bookingData)).unwrap();
        
        setPaymentSuccess(true);
        setShowSnackbar(true);

        setTimeout(() => {
          handleDialogClose();
        }, 2000);

      } catch (err) {
        setPaymentError(err.message);
      } finally {
        setPaymentLoading(false);
      }
    } else {
      setPaymentError('Please select valid check-in and check-out dates.');
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
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
            <Card
              onClick={() => handleCardClick(accommodation)}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                alt={accommodation.name}
                height="200"
                image={accommodation.photos[0]}
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
                      e.stopPropagation();
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

      {selectedAccommodation && (
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
          <DialogContent>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedAccommodation.name}
            </Typography>
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
              Price: R {selectedAccommodation.price} / night
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {selectedAccommodation.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {selectedAccommodation.rating} ★
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amenities: {selectedAccommodation.amenities.join(', ')}
            </Typography>

            <Box mt={2}>
              <TextField
                label="Check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Check-out"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {totalPrice > 0 && (
              <Typography variant="h6" color="text.primary" mt={2}>
                Total Price: R {totalPrice}
              </Typography>
            )}

            {paymentError && <Alert severity="error" sx={{ mt: 2 }}>{paymentError}</Alert>}
            {paymentSuccess && <Alert severity="success" sx={{ mt: 2 }}>Booking Successful!</Alert>}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Close
            </Button>
            <Button
              onClick={handleBooking}
              color="primary"
              disabled={paymentLoading || bookingLoading}
            >
              {paymentLoading || bookingLoading ? 'Processing...' : 'Book Now'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Booking Successful!"
      />
    </>
  );
};

export default AccommodationList;
