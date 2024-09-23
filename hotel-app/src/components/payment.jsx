// Payment.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Typography, Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { initiatePayment } from "../Redux/bookingSlice";

const Payment = () => {
  const { bookingId, price } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (!paymentMethod.error) {
        // Initiate payment through Redux action
        dispatch(initiatePayment({
          bookingId,
          paymentMethodId: paymentMethod.paymentMethod.id,
          amount: price,
        }));
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Complete Your Payment for Booking #{bookingId}
      </Typography>
      <Typography variant="h6">Amount: R {price}</Typography>
      <CardElement />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={!stripe || loading}
      >
        {loading ? <CircularProgress size={24} /> : "Pay Now"}
      </Button>
    </div>
  );
};

export default Payment;
