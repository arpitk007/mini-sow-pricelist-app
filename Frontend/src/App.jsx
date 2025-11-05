import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Pricelist from './pages/Pricelist';

const App = () => {
  return (
    <AppShell>  
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/terms" element={<Terms/>} />
      <Route path="/pricelist" element={<Pricelist/>} />
      <Route path="*" element={<Navigate to="/login" replace/>} />
    </Routes>
    </AppShell>
  );
};

export default App;