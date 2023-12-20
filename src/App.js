import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import Event from './pages/Event';
import New from './pages/New';

import './App.css';

function App() {
  return <Routes>
    <Route path='/' element={<Navigate to='/login' />} />
    <Route path='/login' element={<Login />} />
    <Route path='/home' element={<Home />} />
    <Route path='/event' element={<Event />} />
    <Route path='/friend' element={<User />} />
    <Route path='/new' element={<New />} />
  </Routes>
}

export default App;
