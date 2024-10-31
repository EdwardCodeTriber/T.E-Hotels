import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import PaymentPage from './components/PaymentPage'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Montserrat, Arial, sans-serif",
    h4: {
      fontFamily: "Montserrat, sans-serif",
    },
    body1: {
      fontFamily: "Lato, sans-serif",
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff7043",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#388e3c",
    },
  },
});


  const App = () => {
   

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />

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
    
    </ThemeProvider>
      
    </>
  )
}

export default App
