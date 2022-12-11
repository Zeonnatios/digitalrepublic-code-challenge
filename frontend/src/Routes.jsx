import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account/profile" element={<Profile />} />
      <Route path="/account/deposit" element={<Deposit />} />
      <Route path="/account/withdraw" element={<Withdraw />} />
      <Route path="/account/transfer/:accountNumber" element={<Transfer />} />
    </Routes>
  );
}
export default Router;
