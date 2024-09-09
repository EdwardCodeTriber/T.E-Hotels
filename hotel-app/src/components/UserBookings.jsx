import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "../Redux/bookingSlice";
import { Typography, Grid, Card, CardContent } from "@mui/material";

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  if (loading) return <Typography>Loading your bookings...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Grid container spacing={4}>
      {bookings.map((booking) => (
        <Grid item xs={12} md={6} lg={4} key={booking.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{booking.roomType}</Typography>
              <Typography>Check-In: {booking.checkInDate}</Typography>
              <Typography>Check-Out: {booking.checkOutDate}</Typography>
              <Typography>Price: R {booking.price}</Typography>
              <Typography>Booking is: {booking.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserBookings;
