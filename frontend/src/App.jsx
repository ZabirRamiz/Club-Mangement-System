
import './App.css'



import { } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import UserPost from './components/UserPost.jsx';
import UserEvent from './components/UserEvent.jsx';
import UserEditProfile from './components/UserEditProfile.jsx';
import { UserProvider } from './components/UserContext.jsx';
function App() {
 

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div><Navbar/><Home/></div>}/>
          <Route path='/UserDashboard' element={<div><Navbar/><UserDashboard/></div>}/>
          <Route path='/UserEditProfile' element={<div><Navbar/><UserEditProfile/></div>}/>
          <Route path='/UserPost' element={<div><Navbar/><UserPost/></div>}/> 
          <Route path='/UserEvent' element={<div><Navbar/><UserEvent/></div>}/> 
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      
      </BrowserRouter>
    </UserProvider>

    
    </>
  )
}

export default App