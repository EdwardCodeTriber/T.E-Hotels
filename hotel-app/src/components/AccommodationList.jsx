import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations } from "../Redux/accommodationSlice";
import { createReservation } from "../Redux/reservationSlice";
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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Carousel from "react-material-ui-carousel";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const loading = useSelector((state) => state.accommodations.loading);
  const error = useSelector((state) => state.accommodations.error);
  const user = useSelector((state) => state.auth.user);

  const [favorites, setFavorites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [bookingError, setBookingError] = useState("");

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
    setBookingError("");
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAccommodation(null);
    setCheckIn("");
    setCheckOut("");
    setTotalPrice(0);
    setBookingError("");
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
        setBookingError("Check-out date must be after check-in date");
      }
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [checkIn, checkOut, selectedAccommodation]);

  const handleBooking = async () => {
    if (!user) {
      setBookingError("Please login to make a booking");
      return;
    }

    if (!checkIn || !checkOut) {
      setBookingError("Please select check-in and check-out dates");
      return;
    }

    const bookingData = {
      userId: user.uid,
      accommodationId: selectedAccommodation.id,
      accommodationName: selectedAccommodation.name,
      checkIn,
      checkOut,
      totalPrice,
      status: "pending_payment"
    };

    try {
      await dispatch(createReservation(bookingData)).unwrap();
      setShowSnackbar(true);
      handleDialogClose();
      // Redirect to payment page
      window.location.href = `/payment/${bookingData.accommodationId}`;
    } catch (err) {
      setBookingError(err.message);
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

  const amenityIcons = {
    Wi_Fi: { icon: <WifiIcon />, color: "#4CAF50" },
    Pool: { icon: <PoolIcon />, color: "#2196F3" },
    Room_Service: { icon: <RoomServiceIcon />, color: "#FF5722" },
    Parking: { icon: <LocalParkingIcon />, color: "#FFC107" },
    Gym: { icon: <FitnessCenterIcon />, color: "black" },
    Restaurant: { icon: <RestaurantIcon />, color: "red" },
  };

  return (
    <>
      <Grid container spacing={3} padding={2}>
        {/* Accommodation cards */}
        {accommodations.map((accommodation) => (
          <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
            <Card
              onClick={() => handleCardClick(accommodation)}
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
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
                <Typography color="text.secondary">
                  Price: R {accommodation.price}
                </Typography>
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
                    color={favorites.includes(accommodation.id) ? "secondary" : "default"}
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

      {/* Booking Dialog */}
      {selectedAccommodation && (
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
          <DialogContent>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedAccommodation.name}
            </Typography>
            <Carousel autoPlay={false} navButtonsAlwaysVisible>
              {selectedAccommodation.photos.map((photo, index) => (
                <Box key={index} sx={{ height: 300, overflow: "hidden" }}>
                  <img
                    src={photo}
                    alt={`${selectedAccommodation.name} ${index}`}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "100%",
                    }}
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
            
            <Typography variant="body2" color="text.secondary" mt={2}>
              Amenities:
              <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                {selectedAccommodation.amenities.map((amenity, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    sx={{
                      backgroundColor: amenityIcons[amenity]?.color || "#e0e0e0",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {amenityIcons[amenity]?.icon}
                    <Typography variant="body2" ml={0.5}>
                      {amenity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Typography>

            <Box mt={2} sx={{ display: "flex", gap: 2 }}>
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

            {bookingError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {bookingError}
              </Alert>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Close
            </Button>
            <Button onClick={handleBooking} color="primary">
              Book Now
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Booking Created Successfully!"
      />
    </>
  );
};

export default AccommodationList;