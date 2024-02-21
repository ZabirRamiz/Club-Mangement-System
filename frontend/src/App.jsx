// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


//npm install react-router-dom  while being in /frontend/
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages an components
// import Home from './pages/Home.jsx'
import Members from './pages/Members.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import UserPost from './components/UserPost.jsx';
import UserEvent from './components/UserEvent.jsx';
import UserEditProfile from './components/UserEditProfile.jsx';
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
     <Route path="/Login" element={<Login/>}/>
    </Routes>
    
    </BrowserRouter>

    
    </>
  )
}

export default App
