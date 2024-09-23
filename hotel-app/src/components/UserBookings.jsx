import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import {fetchUserBookings} from "../Redux/bookingSlice"

const UserBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.auth.user);

 

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, user]);

  const handlePay = (bookingId, price) => {
    navigate(`/payment/${bookingId}/${price}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }



  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Pending Bookings
      </Typography>

      <Grid container spacing={4}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} lg={4} key={booking.id}>
            <Card
              sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}
            >
              {booking.picture && (
                <CardMedia
                  component="img"
                  height="140"
                  image={booking.picture}
                  alt={booking.roomType}
                />
              )}
              <CardContent>
                <Typography variant="h6">
                  Room Type: {booking.roomType}
                </Typography>
                <Typography>Check-in: {booking.checkInDate}</Typography>
                <Typography>Check-out: {booking.checkOutDate}</Typography>
                <Typography>Price per night: R {booking.price}</Typography>
                <Typography>Status: {booking.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      {bookings.length === 0 && (
        <Typography>No pending bookings found.</Typography>
      )}
    </div>
  );
};

export default UserBookings;
