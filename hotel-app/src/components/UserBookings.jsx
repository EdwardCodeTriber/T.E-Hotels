import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Card, CardContent, CardMedia, CardActions, Button } from "@mui/material";
import { processPayment } from "../Redux/bookedSlice";  

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
    }
  }, [dispatch, user]);

  const handlePayment = (booking) => {
    dispatch(processPayment(booking));
  };

  if (loading) return <Typography>Loading your bookings...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Bookings
      </Typography>

      <Grid container spacing={4}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} lg={4} key={booking.id}>
            <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}>
              {booking.picture && (
                <CardMedia
                  component="img"
                  height="140"
                  image={booking.picture}
                  alt={booking.roomType}
                />
              )}
              <CardContent>
                <Typography variant="h6">Room Type: {booking.roomType}</Typography>
                <Typography>Check-in: {booking.checkInDate}</Typography>
                <Typography>Check-out: {booking.checkOutDate}</Typography>
                <Typography>Price per night: R {booking.price}</Typography>
                <Typography>Status: {booking.status}</Typography>

                {booking.status !== "booked" && (
                  <CardActions sx={{display:'flex', justifyContent:"flex-end"}}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePayment(booking)}
                    sx={{ mt: 2,backgroundColor:'#6d28d9' }}
                  >
                    Pay Now
                  </Button>
                  </CardActions>
                  
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br/>
      {bookings.length === 0 && (
        <Typography>No bookings found. You haven't booked any rooms yet.</Typography>
      )}
    </div>
  );
};

export default UserBookings;
