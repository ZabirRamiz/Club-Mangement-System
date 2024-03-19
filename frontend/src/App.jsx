
import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import UserPost from './components/UserPost.jsx';
import UserEvent from './components/UserEvent.jsx';
import UserEditProfile from './components/UserEditProfile.jsx';
import UserAssignWork from './components/UserAssignWork.jsx';
import ManageMembers from './components/ManageMembers.jsx';
import PendingMembers from './components/PendingMembers.jsx';

function App() {
 

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div><Navbar/><Home/></div>}/>
        <Route path='/UserDashboard' element={<div><Navbar/><UserDashboard/></div>}/>
        <Route path='/UserEditProfile' element={<div><Navbar/><UserEditProfile/></div>}/>
        <Route path='/UserPost' element={<div><Navbar/><UserPost/></div>}/> 
        <Route path='/UserEvent' element={<div><Navbar/><UserEvent/></div>}/>
        <Route path='/UserAssignWork' element={<div><Navbar/><UserAssignWork/></div>}/> 
        <Route path='/ManageMembers' element={<div><Navbar/><ManageMembers/></div>}/> 
        <Route path='/PendingMembers' element={<div><Navbar/><PendingMembers/></div>}/> 
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    
    </BrowserRouter>


    
    </>
  )
}

export default App