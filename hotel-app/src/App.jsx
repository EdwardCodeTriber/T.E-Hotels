import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Landing from './components/Landing'

function App() {

  return (
    <>
    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
    </Routes>
    </BrowserRouter> */}
    <LandingPage/>
    <Landing/>
      
    </>
  )
}

export default App
