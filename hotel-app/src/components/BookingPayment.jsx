import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Button,
  Alert,
  AlertTitle,
  Paper,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

// Initialize Stripe outside component (replace with your publishable key)
const stripePromise = loadStripe('pk_test_51Px59aJPbpXk7YOzwZFEmqEENYeYAO4o0NQRX3CJbIee2TGOTUMQTw0KlswD4swqvkHSvJSsG9lc0DrRM5yMGBaU00o9vhiAem');

const BookingPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Sample booking data (replace with your actual data)
  const checkIn = '2024-10-28';
  const checkOut = '2024-10-30';
  const totalPrice = 1000; // Your total price

  const handleBooking = async () => {
    if (checkIn && checkOut && totalPrice > 0) {
      setLoading(true);
      setError(null);
      
      try {
        const stripe = await stripePromise;
        
        // Create a payment method directly instead of using payment intent
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: {
            number: '4242424242424242', // Test card number
            exp_month: 12,
            exp_year: 2025,
            cvc: '123',
          },
          billing_details: {
            name: 'Test User',
            email: 'test@example.com',
          },
        });

        if (paymentMethodError) {
          throw new Error(paymentMethodError.message);
        }

        // Confirm the payment without a backend
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          // In a real implementation, you'd get this client secret from your backend
          // For demo purposes, we're simulating a successful payment
          'dummy_client_secret',
          {
            payment_method: paymentMethod.id,
          }
        );

        if (confirmError) {
          throw new Error(confirmError.message);
        }

        // Payment successful
        setSuccess(true);
        
        // Here you would typically save the booking details
        const bookingDetails = {
          checkIn,
          checkOut,
          totalPrice,
          paymentMethodId: paymentMethod.id,
          timestamp: new Date().toISOString(),
        };
        
        // Save booking details to localStorage for demo purposes
        localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Booking Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Check-in: {checkIn}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Check-out: {checkOut}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Total Price: R{totalPrice}
          </Typography>
        </Box>
      </Paper>

      <Button
        variant="contained"
        fullWidth
        onClick={handleBooking}
        disabled={loading || success}
        sx={{ mb: 2 }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
            Processing Payment...
          </Box>
        ) : (
          'Confirm Booking'
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Payment Failed</AlertTitle>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <AlertTitle>Booking Confirmed!</AlertTitle>
          Your payment has been processed successfully. Check your email for booking details.
        </Alert>
      )}
    </Box>
  );
};

export default BookingPayment;