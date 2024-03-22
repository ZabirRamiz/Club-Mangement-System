
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
import InterviewLobby from './components/InterviewLobby.jsx';
import InterviewRoom from './components/InterviewRoom.jsx';
import Finance from './components/Finance.jsx';
import EventPost from './components/EventPost.jsx';

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
        <Route path='/EventPost' element={<div><Navbar/><EventPost/></div>}/>
        <Route path='/UserAssignWork' element={<div><Navbar/><UserAssignWork/></div>}/> 
        <Route path='/ManageMembers' element={<div><Navbar/><ManageMembers/></div>}/> 
        <Route path='/PendingMembers' element={<div><Navbar/><PendingMembers/></div>}/> 
        <Route path='/Interview' element={<div><Navbar/><InterviewLobby/></div>}/> 
        <Route path='/Finance' element={<div><Navbar/><Finance/></div>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/InterviewRoom/:roomid" element={<div><Navbar/><InterviewRoom/></div>}/>
      </Routes>
    
    </BrowserRouter>


    
    </>
  )
}

export default App