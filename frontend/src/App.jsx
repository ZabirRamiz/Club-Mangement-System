
import './App.css'



import { } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
function App() {
 

  return (
    <>
    
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<div><Navbar/><Home/></div>}/>
     <Route path="/Login" element={<Login/>}/>
    </Routes>
    
    </BrowserRouter>

    
    </>
  )
}

export default App
