import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import PaymentPage from './components/PaymentPage'



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/LogIn' element={<LogIn/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path='/ContactUs' element={<ContactUs/>}/>
      <Route path='/payment/:bookingId/:price' element={<PaymentPage />} />
    </Routes>
    </BrowserRouter>
    
    {/* <Landing/> */}
      
    </>
  )
}

export default App
