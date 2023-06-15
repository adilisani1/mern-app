
import './App.css';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <div className="">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
