// PaymentForm.js
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";

const PaymentForm = ({ totalPrice, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      // Call a passed in callback function to inform the parent about payment status
      onPaymentSuccess(paymentMethod.id);
    } catch (err) {
      onPaymentError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : `Pay R ${totalPrice}`}
      </Button>
    </form>
  );
};

export default PaymentForm;
