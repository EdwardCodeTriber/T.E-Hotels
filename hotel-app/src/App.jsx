import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import PaymentPage from './components/PaymentPage'
import React from 'react';
// import { Elements } from '@stripe/stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import BookingPayment from './components/BookingPayment'



// function App() {

  const App = () => {
    const options = {
      mode: 'payment',
      currency: 'zar',
      appearance: {
        theme: 'stripe',
      },
    };

  return (
    <>
    {/* <Elements stripe={stripePromise} options={options}> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/LogIn' element={<LogIn/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path='/ContactUs' element={<ContactUs/>}/>
      <Route path='/payment/:bookingId/:price' element={<PaymentPage />} />
      <Route path='/BookingPayment' element={<BookingPayment/>}/>
    </Routes>
    </BrowserRouter>
    {/* </Elements> */}
    
    
    {/* <Landing/> */}
      
    </>
  )
}

export default App
