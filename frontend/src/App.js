//npm install react-router-dom  while being in /frontend/
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages an components
import Home from './pages/Home'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
          <Routes>
            <Route
              path = "/"
              element = {<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
