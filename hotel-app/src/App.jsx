import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'



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
      

    </Routes>
    </BrowserRouter>
    
    {/* <Landing/> */}
      
    </>
  )
}

export default App
