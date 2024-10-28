import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/stripe-js';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const PaymentComponent = ({ totalPrice, checkIn, checkOut, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !checkIn || !checkOut) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // Convert to cents
          currency: 'zar',
          checkIn,
          checkOut,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/booking-confirmation`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <form onSubmit={handleBooking}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        
        <PaymentElement />
        
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading || !stripe}
          sx={{ mt: 3 }}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            `Pay R${totalPrice.toFixed(2)}`
          )}
        </Button>
      </form>
    </Box>
  );
};

export default PaymentComponent;