import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "../Redux/bookingSlice";
import { Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";  

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_51Px59aJPbpXk7YOzwZFEmqEENYeYAO4o0NQRX3CJbIee2TGOTUMQTw0KlswD4swqvkHSvJSsG9lc0DrRM5yMGBaU00o9vhiAem");

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, user]);

  const calculateTotalPrice = (checkInDate, checkOutDate, pricePerNight) => {
    const checkIn = dayjs(checkInDate);
    const checkOut = dayjs(checkOutDate);
    const daysStayed = checkOut.diff(checkIn, "day"); 
     // total price
    return daysStayed * pricePerNight;
  };

  const handlePayment = async (booking) => {
    const stripe = await stripePromise;
    const totalPrice = calculateTotalPrice(booking.checkInDate, booking.checkOutDate, booking.price);

    // Create the Stripe Checkout session (client-side only)
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price_data: {
            currency: "R", 
            product_data: {
              name: booking.roomType,
              description: `Booking from ${booking.checkInDate} to ${booking.checkOutDate}`,
            },
            unit_amount: totalPrice * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `${window.location.origin}/success`, // Redirect here after success
      cancelUrl: `${window.location.origin}/cancel`,   // Redirect here after cancellation
    });

    if (error) {
      console.error("Stripe checkout error:", error.message);
    }
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
            <Card>
              {/* Display the image of the booking */}
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

                {/* Calculate total price and add a Pay Now button */}
                <Typography variant="body1">
                  Total Price: R {calculateTotalPrice(booking.checkInDate, booking.checkOutDate, booking.price)}
                </Typography>

                {/* Pay Now button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePayment(booking)}
                  sx={{ mt: 2 }}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {bookings.length === 0 && (
        <Typography>No bookings found. You haven't booked any rooms yet.</Typography>
      )}
    </div>
  );
};

export default UserBookings;
