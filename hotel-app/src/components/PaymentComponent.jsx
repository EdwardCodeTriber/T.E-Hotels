import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, Button, Typography, Box, Alert } from '@/components/ui/card';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Px59aJPbpXk7YOzwZFEmqEENYeYAO4o0NQRX3CJbIee2TGOTUMQTw0KlswD4swqvkHSvJSsG9lc0DrRM5yMGBaU00o9vhiAem');

const PaymentComponent = ({ accommodation, checkIn, checkOut, totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const stripe = await stripePromise;
      
      // Create a checkout session directly with Stripe
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price_data: {
              currency: 'zar',
              unit_amount: totalPrice * 100, // Stripe expects amounts in cents
              product_data: {
                name: accommodation.name,
                description: `Check-in: ${checkIn}, Check-out: ${checkOut}`,
                images: accommodation.photos ? [accommodation.photos[0]] : [],
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${window.location.origin}/booking/success`,
        cancel_url: `${window.location.origin}/booking/cancel`,
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardContent className="p-6">
        <Typography variant="h5" className="mb-6 font-bold">
          Booking Summary
        </Typography>
        
        <Box className="space-y-4">
          <div className="border-b pb-4">
            <Typography variant="subtitle1" className="font-semibold">Accommodation</Typography>
            <Typography variant="body1">{accommodation.name}</Typography>
          </div>
          
          <div className="border-b pb-4">
            <Typography variant="subtitle1" className="font-semibold">Check-in</Typography>
            <Typography variant="body1">{new Date(checkIn).toLocaleDateString()}</Typography>
          </div>
          
          <div className="border-b pb-4">
            <Typography variant="subtitle1" className="font-semibold">Check-out</Typography>
            <Typography variant="body1">{new Date(checkOut).toLocaleDateString()}</Typography>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <Typography variant="subtitle1" className="font-semibold">Total Amount</Typography>
            <Typography variant="h4" className="text-primary">R {totalPrice.toFixed(2)}</Typography>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              {error}
            </Alert>
          )}

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                Processing...
              </span>
            ) : (
              'Pay Now'
            )}
          </Button>
          
          <Typography variant="body2" className="text-center text-gray-500 mt-4">
            Secure payment powered by Stripe
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentComponent;