import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Deposit from './pages/Deposit';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account/profile" element={<Profile />} />
      <Route path="/account/deposit" element={<Deposit />} />
      <Route path="/account/deposit" element={<Deposit />} />
      <Route path="/account/deposit" element={<Deposit />} />
    </Routes>
  );
}
export default Router;
