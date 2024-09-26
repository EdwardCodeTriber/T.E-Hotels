import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { initiatePayment } from "../Redux/payingSlice";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

const PaymentPage = () => {
    
  const { bookingId, price } = useParams(); 
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      // Dispatch Redux action to initiate payment and confirm in Firebase
      dispatch(initiatePayment({ bookingId, paymentMethodId: paymentMethod.id, amount: price }))
        .then(() => {
          setLoading(false);
          // Navigate to success page
          navigate("/success"); 
        })
        .catch((error) => {
          console.error("Payment failed", error);
          setLoading(false);
        });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
      <Typography variant="h5" gutterBottom>
        Pay for Booking #{bookingId}
      </Typography>
      <Typography variant="h6">Total Amount: R {price}</Typography>

      <CardElement />

      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" onClick={handlePayment} disabled={!stripe}>
          Pay Now
        </Button>
      )}
    </Box>
  );
};

export default PaymentPage;
